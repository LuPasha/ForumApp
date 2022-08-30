import React from "react";
import UserIconProfile from "../user-icon/user-icon-profile";
import "./message-block-reply-page.scss";
import { useDispatch } from "react-redux";
import { openReplyPage } from "../../features/channel/channelSlice";
import { setupReplies } from "../../features/channel/channelSlice";
import { useState } from "react";
import ReplyButtonGroup from "../reply-button-group/reply-button-group";
import ButtonGroupReplyHeader from "../reply-button-group/button-group-reply-header";

const MessageBlockReplyPage = ({ mes }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  // if (mes === null || mes === undefined) {
  //   return <></>;
  // }
  const rs = mes?.replies;
  const replies = Object.values(rs);
  const hasReplies = replies?.length !== 0;

  const showReplies = () => {
    dispatch(openReplyPage());
  };

  return (
    <div
      className="message-block-reply-page-container"
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
          <div className="name">{mes.userName}</div>
          <div className="time">{mes.time}</div>
        </div>
        <div className="message">{mes.message}</div>
        {hasReplies && (
          <div className="reply-link">
            <button onClick={showReplies}>go to reply</button>
            {replies?.map((r) => {
              return r.replyContent;
            })}
          </div>
        )}
      </div>
      {isHovered && <ButtonGroupReplyHeader message={mes} />}
    </div>
  );
};

export default MessageBlockReplyPage;
