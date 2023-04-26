const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const aes256 = require("aes256");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const _ = require("lodash");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const port = process.env.PORT || 8080;
const app = express();
const publicPath = path.join(__dirname, "build");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_ID,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODBURI || "mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
  text: String,
  color: String,
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  notes: [noteSchema],
  googleId: String,
  facebookId: String,
});

userSchema.plugin(passportLocalMongoose, {
  usernameUnique: false,
});
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: "https://memo-io.herokuapp.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { username: `google_${profile.id}`, googleId: profile.id },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "https://memo-io.herokuapp.com/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate(
        { username: `facebook_${profile.id}`, facebookId: profile.id },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

function encrypt_notes(notes) {
  return _.map(notes, (note) => ({
    ...note,
    text: aes256.encrypt(process.env.ENC_KEY, note.text),
  }));
}

function decrypt_notes(notes) {
  return _.map(notes, (note) => ({
    ...note._doc,
    text: aes256.decrypt(process.env.ENC_KEY, note.text),
  }));
}

function save_notes(req, res) {
  if (req.isAuthenticated()) {
    User.updateOne(
      { _id: req.user.id },
      { notes: encrypt_notes(JSON.parse(req.body.notes)) },
      (err) => {
        if (err) {
          console.log(err);
        } else {
          res.send("successs");
        }
      }
    );
  } else {
    console.log("should not be possible");
  }
}

app.get("/", function (req, res) {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.use("/", express.static(publicPath));

app.post("/register", function (req, res) {
  User.register(
    {
      username: req.body.username,
      notes: encrypt_notes(JSON.parse(req.body.notes)),
    },
    req.body.password,
    function (err, user) {
      if (err) {
        err.message =
          err.name === "UserExistsError"
            ? "A user with that email is already registered."
            : err.message;
        res.status(401).send(err);
      } else {
        passport.authenticate("local")(req, res, function () {
          res.send("authenticated");
        });
      }
    }
  );
});

app.post("/login", function (req, res) {
  if (req.isAuthenticated()) {
    res.send(decrypt_notes(req.user.notes));
  } else {
    passport.authenticate("local")(req, res, function () {
      res.send(decrypt_notes(req.user.notes));
    });
  }
});

app.post("/save", function (req, res) {
  save_notes(req, res);
});

app.post("/logout", function (req, res) {
  save_notes(req, res);
});

app.listen(port);
