import React from "react";
import "./roomTag.scss";
import { useNavigate } from "react-router-dom";

const RoomTag = ({ room }) => {
  const { roomName } = room;
  const navigate = useNavigate();
  return (
    <div
      className="room-tag-container"
      onClick={() => {
        navigate(`/app/ac/${room.roomId}`);
      }}
    >
      <div className="showed-section">
        #<h4 className="title">{roomName}</h4>
      </div>
    </div>
  );
};

export default RoomTag;
