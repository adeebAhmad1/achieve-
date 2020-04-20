import React, { Component } from "react";
import { Link } from "react-router-dom";

//context
// import { AuthContext } from "../../contexts/AuthContext";

//firebase
import firebase from "../../config/firebase";
import { Toast } from "materialize-css";

class Forgot extends Component {
  state = {
    email: "",
    sent: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEmail = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        new Toast({
          html: "A reset email has been sent to your email.Check Your email",classes: "green"
        });
        this.setState({ sent: true });
      })
      .catch((error) => {
        new Toast({ html: error.message, classes: "red" });
      });
  };
  onKeyUp = (e) => {
    e.target.value.length > 0
      ? e.target.classList.add("has-val")
      : e.target.classList.remove("has-val");
  };
  render() {
    return (
      <div>
        <div className="container text-center">
          <div className="col-md-12"></div>
        </div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-t-50 p-b-20">
              <form
                method="POST"
                className="validate-form"
                onSubmit={this.handleEmail}
              >
                <span className="login100-form-title p-b-70">
                  Password Reset
                </span>
                <div
                  className="wrap-input100 validate-input m-b-50"
                  data-validate="Enter password"
                >
                  <input
                    type="email"
                    name="email"
                    maxLength="254"
                    className="input100 browser-default"
                    required
                    id="id_email"
                    ref="emailValue"
                    onChange={this.handleChange}
                    onKeyUp={this.onKeyUp}
                    value={this.state.email}
                  />

                  <span
                    className="focus-input100"
                    data-placeholder="Email"
                  ></span>
                </div>
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" type="submit">
                    Password Reset
                  </button>
                </div>
                <ul className="login-more p-t-60">
                  <li className="m-b-8">
                    <Link to="/login" className="txt2">
                      Login
                    </Link>
                  </li>

                  <li>
                    <span className="txt1">Don’t have an account?</span>

                    <Link to="/signup" className="txt2">
                      Sign up
                    </Link>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
        <div id="dropDownSelect1"></div>
      </div>
    );
  }
}

export default Forgot;
