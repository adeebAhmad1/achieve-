import React, { Component } from "react";
import { Link } from "react-router-dom";

//context

//firebase
import firebase, { db } from "../../config/firebase";
import { Datepicker } from "materialize-css";
class Signup extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  };
  componentDidMount() {
    Datepicker.init(document.querySelectorAll('.datepicker'), { yearRange: [1900,2020] });
    window.interval = setInterval(()=>{this.setState({birthday: document.querySelector('.datepicker').value });console.log(this.state.birthday)},1000)
  }
  componentWillUnmount(){
    clearInterval(window.interval)
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    clearInterval(window.interval)
    if (this.state.email === "") {
      return alert("Please enter email.");
    }
    if (this.state.birthday === "") {
      return alert("Please enter email.");
    }
    if (this.state.password !== this.state.confirmPassword) {
      return alert("You're password doesn't match.");
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(({ user: { uid } }) => {
        const { name,birthday } = this.state;
        db.collection("users")
          .add({
            uid,
            name,
            birthday
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        this.props.history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onKeyUp = (e)=>{
    e.target.value.length > 0 ? e.target.classList.add("has-val") : e.target.classList.remove("has-val")
  }
  render() {
    return (
      <div>
        <div className="container text-center">
          <div className="col l12"></div>
        </div>

        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100 p-t-50 p-b-20">
              <form
                onSubmit={this.handleSubmit}
                method="POST"
                className="login100-form validate-form"
              >
                <span className="login100-form-title p-b-70">
                  Welcome on Achieve+ Sign Up
                </span>
                <div className="row p-t-0">
                  <div className="col l6 s12">
                    <div
                      className="wrap-input100 validate-input m-t-40 m-b-35"
                      data-validate="Enter username"
                    >
                      <input
                        type="text"
                        name="name"
                        maxLength="100"
                        className="input100 browser-default"
                        required
                        id="id_username"
                        onKeyUp={this.onKeyUp}
                        onChange={this.handleChange}
                        value={this.state.name}
                      />
                      <span
                        className="focus-input100"
                        data-placeholder="Username"
                      ></span>
                    </div>
                  </div>
                  <div className="col l6 s12">
                    <div
                      className="wrap-input100 validate-input m-t-40 m-b-35"
                      data-validate="Enter username"
                    >
                      <input onKeyUp={this.onKeyUp}
                        type="email"
                        name="email"
                        maxLength="255"
                        className="input100 browser-default"
                        required
                        id="id_email"
                        onChange={this.handleChange}
                        value={this.state.email}
                      />
                      <span
                        className="focus-input100"
                        data-placeholder="Email"
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col l6 s12">
                    <div
                      className="wrap-input100 validate-input m-t-40 m-b-35"
                      data-validate="Enter username"
                    >
                      <input onKeyUp={this.onKeyUp}
                        type="password"
                        name="password"
                        className="input100 browser-default"
                        required
                        id="id_password1"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      <span
                        className="focus-input100"
                        data-placeholder="Password"
                      ></span>
                    </div>
                  </div>
                  <div className="col l6 s12">
                    <div
                      className="wrap-input100 validate-input m-t-40 m-b-35"
                      data-validate="Enter username"
                    >
                      <input onKeyUp={this.onKeyUp}
                        type="password"
                        name="confirmPassword"
                        className="input100 browser-default"
                        required
                        id="id_password2"
                        onChange={this.handleChange}
                        value={this.state.confirmPassword}
                      />
                      <span
                        className="focus-input100"
                        data-placeholder="Conform Password"
                      ></span>
                    </div>
                  </div>
                  <div className="col l6 s12">
                    <div
                      className="wrap-input100 validate-input m-t-40 m-b-35 "
                      data-validate="Enter username"
                    >
                      <input onChange={this.onKeyUp}
                        type="text"
                        onFocus={(e)=>{
                          document.querySelector(".datepicker-done").addEventListener("click",()=> document.querySelector('.datepicker').classList.add("has-val"))
                        }}
                        name="birthday"
                        value={this.state.birthday}
                        required
                        className="datepicker browser-default input100"
                      />
                      <span
                        className="focus-input100"
                        data-placeholder="Birthday"
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="container-login100-form-btn">
                  <button type="submit" className="login100-form-btn">
                    Sign Up
                  </button>
                </div>
                <ul className="login-more p-t-50">
                  <li className="m-b-8">
                    <span className="txt1">Back to </span>
                    <Link to="/login" className="txt2">
                      Login?
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

export default Signup;
