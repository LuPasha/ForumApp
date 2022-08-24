import React from "react";
import "./channel-section.scss";

import MessageBlock from "../message-block/message-block";
import InputTextarea from "../input-textarea/input-textarea";

const ChannelSection = ({ roomName, roomMessages }) => {
  return (
    <div className="channel-section-container">
      <div className="header">
        <h1>{roomName}</h1>
      </div>
      {Object.values(roomMessages).map((mes) => {
        return <MessageBlock key={mes.messageId} mes={mes} />;
      })}
      <InputTextarea />
    </div>
  );
};

export default ChannelSection;
