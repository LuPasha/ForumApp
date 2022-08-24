import React from "react";
import "./input-textarea.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";

const InputTextarea = () => {
  const { userName, uid } = useSelector((store) => store.user);

  const [text, setText] = useState("");
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const time = today.getHours() + ":" + today.getMinutes();

  console.log(date);
  console.log(time);
  const mid = uuid().slice(0, 24);

  const submitHandler = (e) => {
    e.preventDefault();
    const m = {
      date: date,
      time: time,
      message: text,
      messageId: mid,
      uid: uid,
      userName: "Test",
      replies: [],
    };
  };
  const isEmpty = text === "";

  return (
    <div className="input-textarea-container">
      <form onSubmit={submitHandler}>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        ></textarea>

        <button disabled={isEmpty}>send</button>
      </form>
    </div>
  );
};

export default InputTextarea;
