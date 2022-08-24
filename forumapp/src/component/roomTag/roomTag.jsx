import React from "react";
import "./roomTag.scss";
import { useNavigate } from "react-router-dom";
import { setupSelectRoom } from "../../features/channel/channelSlice";
import { useDispatch } from "react-redux";

const RoomTag = ({ room }) => {
  const { roomName, roomId } = room;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div
      className="room-tag-container"
      onClick={() => {
        navigate(`/app/ac/${room.roomId}`);
        dispatch(setupSelectRoom(room));
      }}
    >
      <div className="showed-section">
        #<h4 className="title">{roomName}</h4>
      </div>
    </div>
  );
};

export default RoomTag;
