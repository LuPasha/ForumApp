import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./channel-tag.scss";
import { addNewRoomToUserChannel } from "../../utils/firebase";
import { current } from "@reduxjs/toolkit";

const ChannelTag = ({ channel }) => {
  const { roomName, date, time, roomId } = channel;
  const [hovered, setHovered] = useState("false");
  const { userRooms, uid } = useSelector((store) => store.user);

  let idArray = [];

  if (userRooms !== undefined && userRooms !== null) {
    idArray = Object.keys(userRooms);
  }
  const bool = idArray.includes(roomId);

  return (
    <div
      className="channel-tag-container"
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseOut={() => {
        setHovered(false);
      }}
      style={{ backgroundColor: hovered ? "#f8f8f8" : "white" }}
    >
      <div className="date-section">
        <div className="name">
          Room Name:<span className="a">{" #" + roomName}</span>
        </div>
        <div className="date">
          created at
          <span className="b">{" " + date}</span>
        </div>
      </div>
      {bool && (
        <div className="warning">You have already joint the channel</div>
      )}
      <div className="button-section">
        <button
          disabled={bool}
          className={bool ? "disabled" : "enabled"}
          onClick={() => {
            addNewRoomToUserChannel({ [roomId]: channel }, uid);
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default ChannelTag;
