import React, { Component } from "react";
import SideBar from "../utils/SideBar";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../utils/Loader";
import { db } from "../../config/firebase";

class ChatPlace extends Component {
  render() {
    return <div className="chatbox"></div>;
  }
}

class Inbox extends Component {
  state={
    chat: []
  }
  static contextType = AuthContext;
  componentDidMount(){
    db.collection("chat").onSnapshot(snapShot=>{
      const chats = []
      snapShot.forEach(doc=>{
        const singleChat = doc.data();
        chats.push(singleChat)
      })
      const chat = chats.filter((el) =>{ 
        return el.users.includes(this.context.user.uid)
       });
      this.setState({chat})
    })
  }
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
                chat={this.state.chat}
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
