import React from "react";
import { useParams } from "react-router-dom";
import "./channel-page.scss";
import { useSelector } from "react-redux";
import MessageBlock from "../message-block/message-block";
import ChannelSection from "../channel-section/channel-section";
import InputTextarea from "../input-textarea/input-textarea";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { useEffect } from "react";
import { collection } from "firebase/firestore";
import { useState } from "react";
const ChannelPage = () => {
  const { rooms, isReplyPageOpen, selectRoom } = useSelector(
    (store) => store.channel
  );

  const [rm, setRm] = useState({});

  const roomName = selectRoom.roomName;

  const { id } = useParams();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "messages", id), (doc) => {
      const docData = doc.data();

      setRm(docData);
    });

    return unsub;
  }, [roomName]);

  return (
    <div className="channel-page-container">
      <ChannelSection roomName={roomName} roomMessages={rm} />

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
