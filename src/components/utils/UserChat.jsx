import React from "react";
import { Link } from "react-router-dom";
const UserChat = ({ person, time, message,link,style }) => {
  return (
    <li className={`person ${style}`}>
      <Link to={link} style={{width: `100%`,height: `100%`}}>
        <span className="title">{person}</span>
        <span className="time">{time}</span>
        <span className="preview">{message}</span>
      </Link>
    </li>
  );
};

export default UserChat;
