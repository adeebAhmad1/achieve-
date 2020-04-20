import React, { Component } from "react";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import firebase from "../../config/firebase"
class Dashboard extends Component {
  state = {
    user: {},
  };
  static contextType = AuthContext;
  componentDidMount() {
    db.collection("users")
      .get()
      .then((snapShot) => {
        const users = [];
        snapShot.forEach((doc) => {
          const user = doc.data();
          user.id = doc.id;
          users.push(user);
        });
        const user = users.find((user) => this.context.user.uid === user.uid);
        this.setState({ user });
      });
  }
  render() {
    return this.context.isAuth ? (
      <div>
        <p> Email : {this.context.user.email} </p>
        <p> Name : {this.state.user.name} </p>
        <p> Birthday : {this.state.user.birthday} </p>
        <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Logout
        </button>
      </div>
    ) : (
      <div className=""></div>
    );
  }
}

export default Dashboard;
