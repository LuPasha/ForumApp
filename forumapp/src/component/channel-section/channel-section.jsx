import React from "react";
import "./channel-section.scss";

import MessageBlock from "../message-block/message-block";
import InputTextarea from "../input-textarea/input-textarea";
import { sortObjectByCreateAt } from "../../utils/sort";
import ReplyButtonGroup from "../reply-button-group/reply-button-group";

const ChannelSection = ({ roomName, roomMessages }) => {
  const srm = sortObjectByCreateAt(roomMessages);
  return (
    <div className="channel-section-container">
      <div className="header">
        <h1>{roomName}</h1>
      </div>
      {roomMessages &&
        srm.map((mes) => {
          return (
            <MessageBlock
              key={mes.messageId}
              mes={mes}
              Buttons={ReplyButtonGroup}
            />
          );
        })}
    </div>
  );
};

export default ChannelSection;
