import React from "react";
import "./input-textarea-with-reply.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { addNewMessageToDatabase } from "../../utils/firebase";
import Picker from "emoji-picker-react";
import { BiggerSmileIcon } from "../../assets/icons/icons";
import { SendIcon } from "../../assets/icons/icons";
import { addNewReplyToDatabase } from "../../utils/firebase";
import { addNewDirectMessageToDatabase } from "../../utils/firebase";

const InputTextareaWithReply = ({ type, DMId }) => {
  const { userName, uid, currentUser } = useSelector((store) => store.user);
  const { selectRoom, selectMessage } = useSelector((store) => store.channel);
  const [showPicker, setShowPicker] = useState(false);

  const [text, setText] = useState("");

  const email = currentUser?.email;
  const isEmpty = text === "";
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const time = today.getHours() + ":" + today.getMinutes();

  const createAt = today.getTime();

  const submitHandler = (e) => {
    e.preventDefault();
    if (type === "channel") {
      const mid = uuid().slice(0, 23);
      const m = {
        date: date,
        time: time,
        message: text,
        messageId: mid,
        uid: uid,
        userName: userName,
        replies: {},
        createAt: createAt,
        userEmail: email,
      };

      addNewMessageToDatabase(m, selectRoom.roomId);
    } else if (type === "reply") {
      const rid = uuid().slice(0, 18);
      const r = {
        date: date,
        time: time,
        message: text,
        messageId: rid,
        uid: uid,
        userName: userName,
        userEmail: email,

        createAt: createAt,
      };

      addNewReplyToDatabase(r, selectMessage.messageId);
    } else if (type === "directMessage") {
      const mid = uuid().slice(0, 23);
      const dm = {
        date: date,
        time: time,
        message: text,
        messageId: mid,
        uid: uid,
        userName: userName,
        userEmail: email,

        createAt: createAt,
      };
      addNewDirectMessageToDatabase(dm, DMId);
    } else {
      console.log("inputarea type error");
    }
    setText("");
  };

  const onEmojiClick = (e, emojiObject) => {
    setText((p) => p + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className="input-textarea-with-reply-container">
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
          onClick={() => {
            setShowPicker((b) => !b);
          }}
          className="smile"
        >
          <BiggerSmileIcon />
        </div>
        {showPicker && (
          <div className="picker">
            <Picker
              pickerStyle={{ width: "50%" }}
              onEmojiClick={onEmojiClick}
            />
          </div>
        )}
        <button
          disabled={isEmpty}
          onClick={submitHandler}
          className={isEmpty ? "disabled" : "enabled"}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default InputTextareaWithReply;
