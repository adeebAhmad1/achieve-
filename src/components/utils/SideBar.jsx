import React from "react";
import UserImage from "./UserImage";
import UserChat from "./UserChat";
import { Link } from "react-router-dom";
const SideBar = ({user:{image,name,uid} ,email ,chat , users,history}) => {
  const showSideUsers = (chats,users)=>{
    if(chats.length > 0){
      chats.sort((a,b)=> b.lastMessage.time - a.lastMessage.time)
      return chats.map((chat,i)=>{
        const user = users.find(el=>chat.users.includes(el.uid));
        const chatUsers = chat.users;
        const recieverIndex = chatUsers.indexOf(uid) === 0 ? 1 : 0 ;
        const reciver = chatUsers[recieverIndex];
        return <UserChat link={`/inbox/${uid}/${reciver}`} message={chat.lastMessage.message} person={user.name} time={new Date(chat.lastMessage.time).toLocaleTimeString() + " " + new Date(chat.lastMessage.time).toLocaleDateString() } key={i}/>
      })
    }
  }
  return (
    <div className="messages">
      <Link to="/" className="material-icons" style={{position: `absolute`,left: `10px`}}>arrow_back</Link>
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
