import React, { Component } from "react";
import { db } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import firebase from "../../config/firebase";
import { Toast } from "materialize-css";
import Footer from "../Layout/Footer";
import Header from "../Layout/Header";
import UserImage from "../utils/UserImage";
class Dashboard extends Component {
  state = {
    user: {},
    isVerified: false,
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
        this.setState({ isVerified: this.context.user.emailVerified });
        this.setState({ user });
      });
  }
  render() {
    const links = [
      { text: "Home", link: "/" },
      { text: "Logout", link: "/login" },
      {text: "Inbox", link: "/inbox"}
    ];
    return this.context.isAuth ? (
      <div className="" style={{ height: `100vh` }}>
        <Header links={links} history={this.props.history} />
        <div className="container outer">
          <div className="styles">
            <UserImage image={this.state.user.image} />
            <ul className="collection with-header ">
              <li className="collection-header">
                <h4 className="center">Personal Details</h4>
              </li>
              <li className="collection-item">
                <div>
                  Email{" "}
                  <span
                    className={`secondary-content ${
                      this.context.user.emailVerified
                        ? "green-text"
                        : "red-text"
                    }`}
                  >
                    {this.context.user.email}
                    {this.context.user.emailVerified ? (
                      ""
                    ) : this.state.isVerified ? (
                      ""
                    ) : (
                      <button
                        onClick={() => {
                          firebase
                            .auth()
                            .currentUser.sendEmailVerification()
                            .then(() => {
                              new Toast({
                                html:
                                  "Verification Link has been sent.Check your Email.",
                                classes: "green",
                              });
                              this.setState({ isVerified: true });
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }}
                        className="red white-text"
                      >
                        {" "}
                        &nbsp;Verify
                      </button>
                    )}
                  </span>
                </div>
              </li>
              <li className="collection-item">
                <div>
                  Username{" "}
                  <span className="secondary-content">
                    {this.state.user.name}
                  </span>
                </div>
              </li>
              <li className="collection-item">
                <div>
                  Birthday{" "}
                  <span className="secondary-content">
                    {this.state.user.birthday}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <Footer links={links} />
      </div>
    ) : (
      <div className=""></div>
    );
  }
}

export default Dashboard;
