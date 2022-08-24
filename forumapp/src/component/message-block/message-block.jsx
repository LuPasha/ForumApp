import React from "react";
import UserIconProfile from "../user-icon/user-icon-profile";
import "./message-block.scss";
import { useDispatch } from "react-redux";
import { openReplyPage } from "../../features/channel/channelSlice";
import { setupReplies } from "../../features/channel/channelSlice";

const MessageBlock = ({ mes }) => {
  const rs = Object.values(mes.replies);
  const hasReplies = rs.length !== 0;

  const dispatch = useDispatch();

  const showReplies = () => {
    dispatch(setupReplies(rs));
    dispatch(openReplyPage());
  };

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
            <button onClick={showReplies}>go to reply</button>
            {rs.map((r) => {
              return r.replyContent;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBlock;
