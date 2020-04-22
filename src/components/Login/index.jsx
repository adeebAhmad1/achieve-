import React, { Component } from "react";
import { Link } from "react-router-dom";

//firebase
import firebase from "../../config/firebase";
import { Toast } from "materialize-css";
class Login extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentDidMount() {
    firebase.auth().signOut();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        this.setState({ loading: false });
        new Toast({ html: error.message, classes: "red" });
      });
  };
  onKeyUp = (e) => {
    e.target.value.length > 0
      ? e.target.classList.add("has-val")
      : e.target.classList.remove("has-val");
  };
  render() {
    return this.state.loading ? (
      <div className="loader_wrapper" style={{width: `100%`}}>
        <div className="loader"></div>
      </div>
    ) : (
      <div>
        <div className="container row">
          <div className="col s6"></div>
        </div>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100" style={{ maxWidth: `400px` }}>
              <form
                onSubmit={this.handleSubmit}
                method="POST"
                className="login100-form validate-form"
              >
                <span className="login100-form-title">
                  Welcome on Achieve+ Log In
                </span>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter username"
                >
                  <input
                    type="email"
                    name="email"
                    autoFocus
                    className="input100 browser-default"
                    required
                    id="id_email"
                    onKeyUp={this.onKeyUp}
                    value={this.state.email}
                    onChange={this.handleChange}
                  />

                  <span
                    className="focus-input100"
                    data-placeholder="Email"
                  ></span>
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter password"
                >
                  <input
                    type="password"
                    name="password"
                    className="input100 browser-default"
                    required
                    id="id_password"
                    onKeyUp={this.onKeyUp}
                    value={this.state.password}
                    onChange={this.handleChange}
                  />

                  <span
                    className="focus-input100"
                    data-placeholder="Password"
                  ></span>
                </div>

                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn">
                    Login
                  </button>
                </div>

                <ul className="login-more">
                  <li className="">
                    <span className="txt1">Forgot </span>

                    <Link to="/forgot" className="txt2">
                      Password?
                    </Link>
                  </li>

                  <li>
                    <span className="txt1">Don’t have an account? </span>

                    <Link to="/signup" className="txt2">
                      Sign up
                    </Link>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
