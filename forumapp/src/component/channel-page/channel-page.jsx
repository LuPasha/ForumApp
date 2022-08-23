import React from "react";
import { useParams } from "react-router-dom";
import "./channel-page.scss";
import { useSelector } from "react-redux";
import MessageBlock from "../message-block/message-block";

const ChannelPage = () => {
  const { rooms } = useSelector((store) => store.channel);

  const { id } = useParams();

  const theRoom = rooms.find((room) => room.roomId === id);
  const { roomName, roomMessages } = theRoom;

  return (
    <div className="channel-page-container">
      <div>
        <div className="header">
          <h1>{roomName}</h1>
        </div>
        {roomMessages.map((mes) => {
          return <MessageBlock key={mes.messageId} mes={mes} />;
        })}
        <div className="textarea-container">
          <form>
            <textarea></textarea>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
