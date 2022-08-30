import React from "react";
import "./input-textarea-reply-page.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { addNewReplyToDatabase } from "../../utils/firebase";
import Picker from "emoji-picker-react";
import { BiggerSmileIcon } from "../../assets/icons/icons";

const InputTextareaReplyPage = () => {
  const { userName, uid } = useSelector((store) => store.user);
  const { selectMessage } = useSelector((store) => store.channel);
  const [showPicker, setShowPicker] = useState(false);

  const [text, setText] = useState("");
  const isEmpty = text === "";
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const time = today.getHours() + ":" + today.getMinutes();

  const rid = uuid().slice(0, 18);

  const createAt = today.getTime();

  const submitHandler = (e) => {
    e.preventDefault();
    const r = {
      date: date,
      time: time,
      reply: text,
      replyId: rid,
      uid: uid,
      userName: userName,

      createAt: createAt,
    };

    addNewReplyToDatabase(r, selectMessage.messageId);
    setText("");
  };

  const onEmojiClick = (e, emojiObject) => {
    setText((p) => p + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className="input-textarea-reply-page-container">
      <form>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        ></textarea>
      </form>
      <div className="button-section">
        <div
          onClick={(e) => {
            setShowPicker((b) => !b);
          }}
        >
          <BiggerSmileIcon />
        </div>
        {showPicker && (
          <div className="picker">
            <Picker pickerStyle={{}} onEmojiClick={onEmojiClick} />
          </div>
        )}
        <button disabled={isEmpty} onClick={submitHandler}>
          send
        </button>
      </div>
    </div>
  );
};

export default InputTextareaReplyPage;
