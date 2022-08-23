import React from "react";
import UserIconProfile from "../user-icon/user-icon-profile";
import "./message-block.scss";

const MessageBlock = ({ mes }) => {
  const hasReplies = mes.replies.length !== 0;

  console.log(hasReplies);

  return (
    <div className="message-block-container">
      <div className="user-icon-container">
        <UserIconProfile />
      </div>
      <div className="message-container">
        <div className="user-info-section">
          <div className="name">{mes.userName}</div>
          <div className="time">{mes.time}</div>
        </div>
        <div className="message">{mes.message}</div>
        {hasReplies && (
          <div className="reply-link">
            <button>go to reply</button>
            {mes.replies.map((r) => {
              return r.replyContent;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBlock;
