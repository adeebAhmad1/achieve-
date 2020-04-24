import React, { Component } from "react";
import SideBar from "../utils/SideBar";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../utils/Loader";

class ChatPlace extends Component {
  render() {
    return <div className="chatbox"></div>;
  }
}

class Inbox extends Component {
  static contextType = AuthContext;
  render() {
    return (
      <DataContext.Consumer>
        {(state) => {
          const user = state.users.find(
            (user) => user.uid === this.context.user.uid
          );
          const exceptOnlineUser = state.users.filter(
            (el) => el.uid !== user.uid
          );
          return state.loading ? (
            <Loader />
          ) : (
            <div>
              <SideBar
                user={user}
                email={this.context.user.email}
                chat={state.chat}
                users={exceptOnlineUser}
              />
              <ChatPlace />
            </div>
          );
        }}
      </DataContext.Consumer>
    );
  }
}

export default Inbox;
