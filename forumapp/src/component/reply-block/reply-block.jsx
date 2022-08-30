import React from "react";
import UserIconProfile from "../user-icon/user-icon-profile";
import "./reply-block.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ButtonGroupReplyHeader from "../reply-button-group/button-group-reply-header";

const ReplyBlock = ({ reply }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="reply-block-container"
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseOut={() => {
        setIsHovered(false);
      }}
      style={{ backgroundColor: isHovered ? "#f8f8f8" : "white" }}
    >
      <div className="user-icon-container">
        <UserIconProfile />
      </div>
      <div className="message-container">
        <div className="user-info-section">
          <div className="name">{reply.userName}</div>
          <div className="time">{reply.time}</div>
        </div>
        <div className="message">{reply.reply}</div>
      </div>
      {isHovered && <ButtonGroupReplyHeader />}
    </div>
  );
};

export default ReplyBlock;
