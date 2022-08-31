import React, { useState, useEffect } from "react";
import "./reply-page.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeReplyPage } from "../../features/channel/channelSlice";
import { CancelIcon } from "../../assets/icons/icons";
import MessageBlock from "../message-block/message-block";
import MessageBlockReplyPage from "../message-block/message-block-reply-page";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import InputTextareaWithReply from "../input-textarea/input-textarea-with-reply";
import InputTextareaReplyPage from "../input-textarea/input-textarea-reply-page";
import ReplyBlock from "../reply-block/reply-block";
import { sortObjectByCreateAt } from "../../utils/sort";
import ButtonGroupReplyHeader from "../reply-button-group/button-group-reply-header";

const ReplyPage = ({ message }) => {
  const dispatch = useDispatch();
  const mid = message.messageId;
  const [m, setM] = useState({});
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "replies", mid), (doc) => {
      const docData = doc.data();

      setM(docData);
    });
  }, [mid]);

  // if (message.replies !== undefined || message.replies !== null) {
  //   replies = message.replies;
  // }
  const repliesArray = sortObjectByCreateAt(m);

  const isRepliesEmpty = repliesArray.length === 0;
  const count = repliesArray.length;

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
      <div className="message-block">
        <MessageBlock mes={message} Buttons={ButtonGroupReplyHeader} />
      </div>
      {!isRepliesEmpty && (
        <div className="breakline">
          <div className="reply-count">{count} replies</div>
          <div className="line"></div>
        </div>
      )}
      <div>
        {repliesArray.map((r) => {
          return <ReplyBlock key={r.replyId} reply={r} />;
        })}
      </div>
      <div>
        <InputTextareaReplyPage />
      </div>
    </div>
  );
};

export default ReplyPage;
