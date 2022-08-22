import React from "react";
import "./roomTag.scss";

const RoomTag = ({ room }) => {
  const { roomName } = room;
  return (
    <div className="room-tag-container">
      <div className="showed-section">
        #<h4 className="title">{roomName}</h4>
      </div>
    </div>
  );
};

export default RoomTag;
