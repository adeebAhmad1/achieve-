import React, { Component } from "react";
import { DataContext } from "../../context/DataContext";
import ChatBox from "../utils/ChatBox";
import UserChat from "../utils/UserChat";
import Loader from "../utils/Loader";
import { AuthContext } from "../../context/AuthContext";
import UserImage from "../utils/UserImage";
import { db } from "../../config/firebase";
import SideBar from "../utils/SideBar";

class Chat extends Component {
  static contextType = AuthContext;
  state={
    message: "",
    sideChats: null
  }
  onSubmit = (e,chats,userOne,userTwo)=>{
    e.preventDefault();
    let chat = chats.find(chat=> chat.users.includes(userOne) && chat.users.includes(userTwo));
    const newOne = {time: Date.now(), message: this.state.message,userId: userOne};
    this.setState({message: ""})
    if(chat){
      chat.lastMessage = newOne
      chat.chatting.push(newOne)
      db.collection("chat").doc(chat.id).update(chat).then(()=>{
        console.log("HELLO")
      })
    } else{
      chat = {};
      chat.chatting = [];
      chat.chatting.push(newOne);
      chat.lastMessage = newOne
      chat.users = [userOne,userTwo];
      db.collection("chat").add(chat).then(()=>{
        console.log("HELLO")
      })
    }
  }
  
  showChats = (chats,user)=>{
    if(chats){
      return chats.chatting.map((chat,i)=> {
        return <ChatBox key={i} message={chat.message} type={user.uid === chat.userId ? "outgoing" : "incoming"} />
      });
    } else{
      return ""
    }
  }
  handleChange = (e)=>this.setState({[e.target.name]: e.target.value})
  render() {
    return (
      <DataContext.Consumer>
        {(state)=>{
          const user = state.users.find(user=> user.uid === this.context.user.uid);
          const reciver = state.users.find(user=> user.uid === this.props.match.params.reciverId);
          const chats = state.chat.find(el=> el.users.includes(user.uid) && el.users.includes(reciver.uid) );
          const exceptOnlineUser = state.users.filter(el=> el.uid !== user.uid);
          return state.loading ? <Loader/> : <div className="chat_box_outer">
          <div className="chatbox">
            <div className="top-bar">
            {user.image ? (
                      <img className="co-logo" style={{marginTop: `10px`,marginLeft: `10px`,marginRight: 0}} src={reciver.image} alt={reciver.name} />
                  ) : (
                    <div className="avatar">
                      <p> {reciver.name.split("")[0].toUpperCase()} </p>
                    </div>
                  )}
              <div className="name">{reciver.name}</div>
            </div>
            <div className="middle">
              <div className="chat_wrapper">
                {this.showChats(chats,user,reciver)}
              </div>
            </div>
            <div className="bottom-bar">
              <form action="/" onSubmit={(e)=>this.onSubmit(e,state.chat,user.uid,reciver.uid)} className="chat">
                <input
                  type="text"
                  className="message_input browser-default"
                  placeholder="Type a message..."
                  name="message"
                  data-name={user.name}
                  value={this.state.message}
                  onChange={this.handleChange}
                />
                <button className="message_button browser-default">
                  <i className="material-icons">send</i>
                </button>
              </form>
            </div>
          </div>
          <SideBar user={user} users={exceptOnlineUser} chat={state.chat} email={this.context.user.email} />
        </div>
        }}
      </DataContext.Consumer>
    );
  }
}

export default Chat;
