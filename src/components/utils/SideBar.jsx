import React from "react";
import UserImage from "./UserImage";
import UserChat from "./UserChat";

const SideBar = ({user:{image,name,uid} ,email ,chat , users}) => {
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
      <div className="profile">
        {image ? (
          <UserImage
            image={image}
            style={{ transform: `scale(0.8)`, margin: `20px auto` }}
          />
        ) : (
          <div className="avatar">
            <p> {name.split("")[0].toUpperCase()} </p>
          </div>
        )}
        <div className="name2">
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
