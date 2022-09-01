import React from "react";
import "./input-textarea.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { addNewMessageToDatabase } from "../../utils/firebase";
import Picker from "emoji-picker-react";
import { BiggerSmileIcon, SendIcon } from "../../assets/icons/icons";
import { set } from "firebase/database";

const InputTextarea = () => {
  const { userName, uid, currentUser } = useSelector((store) => store.user);
  const { selectRoom } = useSelector((store) => store.channel);
  const [showPicker, setShowPicker] = useState(false);

  const [text, setText] = useState("");
  const isEmpty = text === "";
  const email = currentUser?.email;
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const time = today.getHours() + ":" + today.getMinutes();

  const mid = uuid().slice(0, 23);

  const createAt = today.getTime();

  const submitHandler = (e) => {
    e.preventDefault();
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
    setText("");
  };

  const onEmojiClick = (event, emojiObject) => {
    setText((p) => p + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className="input-textarea-container">
      <textarea
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
      ></textarea>

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

export default InputTextarea;
