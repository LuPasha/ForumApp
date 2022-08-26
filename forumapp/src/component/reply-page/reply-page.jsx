import React from "react";
import "./reply-page.scss";
import { useDispatch } from "react-redux";
import { closeReplyPage } from "../../features/channel/channelSlice";
import { CancelIcon } from "../../assets/icons/icons";

const ReplyPage = ({ message }) => {
  const dispatch = useDispatch();
  return (
    <div className="reply-page-container">
      <div className="reply-page-header">
        <div>
          <span className="Thread">Thread</span>
          <span className="general">#general</span>
        </div>
        <div
          onClick={() => {
            dispatch(closeReplyPage());
          }}
          className="cancel-icon"
        >
          <CancelIcon />
        </div>
      </div>
    </div>
  );
};

export default ReplyPage;
