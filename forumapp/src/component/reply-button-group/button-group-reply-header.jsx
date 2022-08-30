import "./button-group-reply-header.scss";

import React from "react";

import {
  SmileIcon,
  BlackMoreIcon,
  BlackChatIcon,
  BookMarkIcon,
  ChatBox,
} from "../../assets/icons/icons";
import { useState } from "react";
import { openReplyPage } from "../../features/channel/channelSlice";
import { setupSelectMessage } from "../../features/channel/channelSlice";
import { useDispatch } from "react-redux";

const ButtonGroupReplyHeader = ({ message }) => {
  const [s, setS] = useState(false);

  const [mark, setMark] = useState(false);
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="button-group-reply-header-container">
      <div className="reply-button-info-container">
        {s && (
          <div className="aaa-s">
            <span className="info">Add reactions</span>
          </div>
        )}

        {mark && (
          <div className="aaa-mark">
            <span className="info">Add to saved items</span>
          </div>
        )}
        {more && (
          <div className="aaa-more">
            <span className="info">More actions</span>
          </div>
        )}
      </div>
      <div className="reply-button-container">
        <div
          className="icon-container"
          onMouseOver={() => {
            setS(true);
          }}
          onMouseOut={() => {
            setS(false);
          }}
        >
          <SmileIcon />
        </div>

        <div
          className="icon-container"
          onMouseOver={() => {
            setMark(true);
          }}
          onMouseOut={() => {
            setMark(false);
          }}
        >
          <BookMarkIcon />
        </div>
        <div
          className="icon-container"
          onMouseOver={() => {
            setMore(true);
          }}
          onMouseOut={() => {
            setMore(false);
          }}
        >
          <BlackMoreIcon />
        </div>
      </div>
    </div>
  );
};

export default ButtonGroupReplyHeader;
