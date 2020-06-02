import React from "react";
import { Link } from "react-router-dom";
const UserChat = ({ person, time, message,link,style }) => {
  return (
    <li className={`person ${style}`}>
      <Link to={link} style={{width: `100%`,height: `100%`}}>
        <span className="title">{person}</span>
        <span className="preview">{message.length > 10 ? message.slice(0,10)+ "..." : message}</span>
        <span className="time">{time}</span>
      </Link>
    </li>
  );
};

export default UserChat;
