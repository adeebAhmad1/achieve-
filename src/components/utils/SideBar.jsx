import React from "react";
import UserImage from "./UserImage";
import UserChat from "./UserChat";
import { Link } from "react-router-dom";
const SideBar = ({user:{image,name,uid} ,email ,chat , users,history,}) => {
  const showSideUsers = (chats,users)=>{
    if(chats.length > 0){
      chats.sort((a,b)=> b.chatting[b.chatting.length-1].time -a.chatting[a.chatting.length-1].time)
      return chats.map((chat,i)=>{
        const user = users.find(el=>chat.users.includes(el.uid));
        const chatUsers = chat.users;
        const reciver = chatUsers.find(el=> el !== uid);
        const {message , time,uid: senderId} = chat.chatting[chat.chatting.length -1];
        return <UserChat link={`/inbox/${reciver}`} style={!chat.read && senderId === reciver ? "boldChat" : ""} message={message} person={user.name} time={ new Date(time).toLocaleTimeString() + " " + new Date(time).toLocaleDateString() } key={i}/>
      })
    }
  }
  return (
    <div className="messages">
      <div className="profile">
        {image ? (
          <UserImage
            onClick={()=> history.push("/dashboard")}
            image={image}
            style={{ transform: `scale(0.8)`, margin: `20px auto` }}
          />
        ) : (
          <div onClick={()=> history.push("/dashboard")} className="avatar">
            <p> {name.split("")[0].toUpperCase()} </p>
          </div>
        )}
        <div onClick={()=> history.push("/dashboard")} className="name2">
          {name}
          <p className="email"> {email} </p>
        </div>
      </div>
      <ul className="people">
        {showSideUsers(chat, users)}
      </ul>
    </div>
  );
};

export default SideBar;
