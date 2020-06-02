import React, { Component, createContext } from "react";
import firebase from "../config/firebase";

export const AuthContext = createContext();

export default class AuthContextProvider extends Component {
  state = {
    isAuth: false,
    user: {}
  };

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ isAuth: true, user: user });
        console.log('logged in');
      } else {
        this.setState({ isAuth: false, user: {} });
      }
    });
  };

  render() {
    return (
      <AuthContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
