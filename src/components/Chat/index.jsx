import React, { Component } from "react";
import { DataContext } from "../../context/DataContext";
import ChatBox from "../utils/ChatBox";
import Loader from "../utils/Loader";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../config/firebase";
import SideBar from "../utils/SideBar";
import { Link } from "react-router-dom";

class Chat extends Component {
  static contextType = AuthContext;
  state = {
    sideChats: null,
    chat: [],
    loading: true,
    lastMessage: {},
    activeChat: {}
  };
  boolean = true;
  componentDidMount() {
    db.collection("chat").onSnapshot((snapShot) => {
      const chats = [];
      snapShot.forEach((doc) => {
        const oneChat = doc.data();
        oneChat.id = doc.id;
        chats.push(oneChat);
      });
      const chat = chats.filter((el) =>
        el.users.includes(this.context.user.uid)
      );
      setTimeout(() => {
        if(document.querySelector(".middle")){
          document.querySelector(".middle").scrollTo(0, document.querySelector(".middle").scrollHeight)
        }
      }, 1000);
      this.setState({ chat, loading: false });
    });
  }
  onSubmit = (e, chats, userOne, userTwo) => {
    e.preventDefault();
    let chat = chats.find(
      (chat) => chat.users.includes(userOne) && chat.users.includes(userTwo)
    );
    const newOne = {
      time: Date.now(),
      message: document.querySelector("#message_input").value,
      userId: userOne,
    };
    document.querySelector("#message_input").value = ""
    this.setState({lastMessage: newOne})
    if (chat) {
      chat.lastMessage = newOne;
      chat.chatting.push(newOne);
      db.collection("chat").doc(chat.id).update(chat);
    } else {
      chat = {};
      chat.chatting = [];
      chat.chatting.push(newOne);
      chat.lastMessage = newOne;
      chat.users = [userOne, userTwo];
      db.collection("chat").add(chat);
    }
  };
  componentWillUpdate(){
      if(document.querySelector(".middle")){
        document.querySelector(".middle").scrollTo(0, document.querySelector(".middle").scrollHeight)
      }
  }
  showChats = (chats, user) => chats ? chats.chatting.map((chat, i) => ( <ChatBox key={i} message={chat.message} type={user.uid === chat.userId ? "outgoing" : "incoming"}/>)) : ""
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    return this.state.loading ? (
      <Loader />
    ) : (
      <DataContext.Consumer>
        {(state) => {
          const user = state.users.find((user) => user.uid === this.context.user.uid);
          const reciver = state.users.find((user) => user.uid === this.props.match.params.reciverId);
          let chats = {};
          if(user && reciver){
            chats = this.state.chat.find((el) => el.users.includes(user.uid) && el.users.includes(reciver.uid));
            if(chats) {
              if(this.boolean) this.setState({activeChat: chats});
              this.boolean = false
            }
          }
          const exceptOnlineUser = state.users.filter((el) => el.uid !== user.uid);
          return state.loading ? (
            <Loader />
          ) : (
            <div className="chat_box_outer">
              <div className="chatbox">
                <div className="top-bar">
                  {user.image ? (
                    <img
                      className="co-logo"
                      style={{
                        marginTop: `10px`,
                        marginLeft: `10px`,
                        marginRight: 0,
                      }}
                      src={reciver.image}
                      alt={reciver.name}
                    />
                  ) : (
                    <div className="avatar">
                      <p> {reciver.name.split("")[0].toUpperCase()} </p>
                    </div>
                  )}
                  <div className="name">{reciver.name}</div>
                </div>
                <div className="middle">
                  <div className="chat_wrapper">
                    {this.showChats(chats, user, reciver)}
                  </div>
                </div>
                <div className="bottom-bar">
                  <form action="/" onSubmit={(e) => this.onSubmit(e, this.state.chat, user.uid, reciver.uid)} className="chat">
                    <input
                      type="text"
                      autoComplete="off"
                      className="message_input browser-default"
                      id="message_input"
                      placeholder="Type a message..."
                      name="message"
                    />
                    <button className="message_button browser-default">
                      <i className="material-icons">send</i>
                    </button>
                  </form>
                </div>
              </div>
              <SideBar
                history={this.props.history}
                user={user}
                users={exceptOnlineUser}
                chat={this.state.chat}
                email={this.context.user.email}
              />
            </div>
          );
        }}
      </DataContext.Consumer>
    );
  }
}

export default Chat;
