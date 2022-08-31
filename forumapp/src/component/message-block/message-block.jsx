import React from "react";
import UserIconProfile from "../user-icon/user-icon-profile";
import "./message-block.scss";
import { useDispatch } from "react-redux";
import { openReplyPage } from "../../features/channel/channelSlice";
import { setupReplies } from "../../features/channel/channelSlice";
import { useState } from "react";
import ReplyButtonGroup from "../reply-button-group/reply-button-group";
import ReactTooltip from "react-tooltip";

const MessageBlock = ({ mes }) => {
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);
  const [nameHoverd, setNameHovered] = useState(false);
  const [timeHoverd, setTimeHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);

  const rs = mes?.replies;
  const replies = Object.values(rs);
  const hasReplies = replies?.length !== 0;

  const showReplies = () => {
    dispatch(setupReplies(replies));
    dispatch(openReplyPage());
  };

  return (
    <div
      className="message-block-container"
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
          <div
            className="time-date"
            onMouseOver={() => {
              setTimeHovered(true);
            }}
            onMouseOut={() => {
              setTimeHovered(false);
            }}
          >
            <div
              className="time"
              data-tip
              data-for={`date-top${mes.messageId}`}
            >
              <span
                style={{ textDecoration: timeHoverd ? "underline" : "none" }}
              >
                {mes.time}
              </span>
            </div>
            {timeHoverd && (
              <ReactTooltip id={`date-top${mes.messageId}`}>
                {mes.date}
              </ReactTooltip>
            )}
          </div>
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
      {isHovered && <ReplyButtonGroup message={mes} />}
    </div>
  );
};

export default MessageBlock;
