import React from "react";
import UserIconProfile from "../user-icon/user-icon-profile";
import "./message-block.scss";
import { useDispatch } from "react-redux";
import { openReplyPage } from "../../features/channel/channelSlice";
import { setupReplies } from "../../features/channel/channelSlice";
import { useState, useRef } from "react";

import ReactTooltip from "react-tooltip";
import UserInfoPopup from "../user-info-popup/user-info-popup";
import { set } from "firebase/database";

const MessageBlock = ({ mes, Buttons }) => {
  let timer;
  let timer2;
  const nameRef = useRef(null);
  const pos = nameRef.current?.offsetTop;

  const dispatch = useDispatch();
  const [tagpos, setTagpos] = useState(0);

  const [isHovered, setIsHovered] = useState(false);
  const [nameHoverd, setNameHovered] = useState(false);
  const [timeHoverd, setTimeHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);

  const showReplies = () => {
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
        <UserIconProfile userName={mes.userName} />
      </div>
      <div className="message-container">
        <div className="user-info-section">
          <div
            onMouseOver={(e) => {
              setNameHovered(true);
            }}
            onMouseOut={() => {
              setNameHovered(false);
            }}
          >
            <div className="name" ref={nameRef}>
              <span
                style={{ textDecoration: nameHoverd ? "underline" : "none" }}
                onMouseOver={(e) => setTagpos(e.clientY)}
              >
                {mes.userName}
              </span>
            </div>

            {nameHoverd && (
              <UserInfoPopup
                userName={mes.userName}
                userId={mes.uid}
                pos={pos}
                tagpos={tagpos}
              />
            )}
          </div>
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
      </div>
      {isHovered && <Buttons message={mes} />}
    </div>
  );
};

export default MessageBlock;
