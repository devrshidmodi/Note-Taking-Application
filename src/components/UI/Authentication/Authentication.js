import React from "react";
import classes from "./Authentication.module.css";
import Aux from "../../../hoc/Aux";
import axios from "axios";
import NoteContext from "../../../context/NoteContext";
import { noteFilterer } from "../../../functions/noteFunctions";
import ErrorText from "../ErrorText/ErrorText";
import Spinner from "../Spinner/Spinner";

class Registsration extends React.Component {
  static contextType = NoteContext;

  constructor(props) {
    super(props);
    if (props.login !== false) {
      this.setState({ confirm_password: "" });
    }
  }

  state = {
    email: "",
    password: "",
    err: {},
    update_err: false,
    loading: false,
  };

  register = (event) => {
    event.preventDefault();
    if (this.state.password === this.state.confirm_password) {
      const data = new URLSearchParams();
      data.append("username", this.state.email);
      data.append("password", this.state.password);
      data.append("notes", JSON.stringify(noteFilterer(this.props.notes)));
      this.setState({ loading: true });
      axios
        .post("/register", data, { withCredentials: true })
        .then((res) => {
          this.props.updateModal(0);
          this.props.authenticate();
        })
        .catch((err) => this.setState({ err: err.response, update_err: true }))
        .finally(() => this.setState({ loading: false }));
    } else {
      this.setState({
        err: "Passwords do not match. Please fix and try again.",
        update_err: true,
      });
    }
  };

  submit = (event) => {
    event.preventDefault();
    const data = new URLSearchParams();
    data.append("username", this.state.email);
    data.append("password", this.state.password);
    this.setState({ loading: true });
    axios
      .post("/login", data, { withCredentials: true })
      .then((res) => {
        this.props.updateNotes(res.data);
        this.props.updateModal(0);
        this.props.authenticate();
      })
      .catch((err) => this.setState({ err: err.response, update_err: true }))
      .finally(() => this.setState({ loading: false }));
  };

  disable_update_err = () => {
    this.setState({ update_err: false });
  };

  render() {
    return (
      <Aux>
        <h1 className={classes.title}>
          {this.props.login === false ? "Sign Up" : "Login"}
        </h1>
        <form
          style={{ height: "100%" }}
          onSubmit={(event) =>
            this.props.login === false
              ? this.register(event)
              : this.submit(event)
          }
        >
          <div className={classes.signup}>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                placeholder="Your email here"
                name="email"
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                placeholder="Your password here"
                name="password"
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
              />
            </label>

            {this.props.login ? null : (
              <label htmlFor="confirm">
                Confirm Password:
                <input
                  type="password"
                  placeholder="Confirm your password here"
                  name="confirm"
                  onChange={(event) =>
                    this.setState({ confirm_password: event.target.value })
                  }
                />
              </label>
            )}
            <ErrorText
              {...this.state}
              disable_update_err={this.disable_update_err}
            />
            <input className={classes.submit} type="submit" value="Submit" />
            <Spinner loading={this.state.loading} />
          </div>
          <div className={classes.signup}>
            <h4>Your email and password will not be saved if you login with a third party.</h4>
            <a
              class="btn btn-block btn-social btn-google m-4 w-75"
              href="/auth/google"
              role="button"
            >
              <i style={{ height: "100%" }} class="fab fa-google"></i>Sign in
              with Google
            </a>
            <a
              class="btn btn-block btn-social btn-facebook m-4 w-75"
              href="/auth/facebook"
              role="button"
            >
              <i style={{ height: "100%" }} class="fab fa-facebook-f"></i>Sign
              in with Facebook{" "}
            </a>
          </div>
        </form>
      </Aux>
    );
  }
}

export default Registsration;