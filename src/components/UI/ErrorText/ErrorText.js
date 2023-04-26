import React from "react";
import _ from "lodash";

class ErrorText extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.update_err
  }

  componentDidUpdate(prevProps) {
    this.props.disable_update_err()
  }

  render() {
    const { email, password, confirm_password, err } = this.props;
    const text = (() => {
      if (!email) {
        return "Please fill in the email field.";
      } else if (!password) {
        return "Please fill in the password field.";
      } else if (!_.isUndefined(confirm_password) && !confirm_password) {
        return "Please confirm your password.";
      } else if (err) {
        if (!_.isString(err)) {
          if (err.status === 401) {
            return err.data.message || "Email or password is incorrect. Please try again.";
          } else {
            return "An error has occured. Please try again later.";
          }
        } else {
          return err;
        }
      }
    })();

    return !_.isEmpty(err) ? <p style={{ color: "#ca0000" }}>{text}</p> : null;
  }
}

export default ErrorText;