import React from "react";

const ChatBox = ({type , message}) => {
  return (
    <div className={type}>
      <div className="bubble">{message}</div>
    </div>
  );
};

export default ChatBox;
