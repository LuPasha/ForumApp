import React from "react";
import { useParams } from "react-router-dom";
import "./channel-page.scss";
import { useSelector } from "react-redux";
import MessageBlock from "../message-block/message-block";
import ChannelSection from "../channel-section/channel-section";
import InputTextarea from "../input-textarea/input-textarea";

const ChannelPage = () => {
  const { rooms, isReplyPageOpen, replies } = useSelector(
    (store) => store.channel
  );

  const { id } = useParams();

  const theRoom = rooms.find((room) => room.roomId === id);

  const { roomName, roomMessages } = theRoom;

  return (
    <div className="channel-page-container">
      <ChannelSection roomName={roomName} roomMessages={roomMessages} />

      {isReplyPageOpen && (
        <div className="reply-section">
          <div className="header">
            <h1>{roomName}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
