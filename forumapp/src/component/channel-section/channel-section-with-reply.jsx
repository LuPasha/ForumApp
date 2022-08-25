import React from "react";
import "./channel-section-with-reply.scss";

import MessageBlock from "../message-block/message-block";
import InputTextarea from "../input-textarea/input-textarea";
import { sortObjectByCreateAt } from "../../utils/sort";
import InputTextareaWithReply from "../input-textarea/input-textarea-with-reply";

const ChannelSectionWithReply = ({ roomName, roomMessages }) => {
  const srm = sortObjectByCreateAt(roomMessages);

  return (
    <div className="channel-section-with-reply-container">
      <div className="header">
        <h1>{roomName}</h1>
      </div>
      {roomMessages &&
        srm.map((mes) => {
          return <MessageBlock key={mes.messageId} mes={mes} />;
        })}
      <InputTextareaWithReply />
    </div>
  );
};

export default ChannelSectionWithReply;
