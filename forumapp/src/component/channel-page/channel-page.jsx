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
import ChannelSectionWithReply from "../channel-section/channel-section-with-reply";
import { closeReplyPage } from "../../features/channel/channelSlice";
import { useDispatch } from "react-redux";
import { useRef } from "react";
const ChannelPage = () => {
  const dRef = useRef(null);
  const aRef = useRef(null);
  const bRef = useRef(null);
  const cRef = useRef(null);
  const dispatch = useDispatch();
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

  // const styles=window.getComputedStyle(aRef.current)
  // let width =parseInt(styles.width,10)

  // let height

  const onMouseMove = (event) => {};

  return (
    <div className="channel-page-container">
      {isReplyPageOpen ? (
        <div className="reply-page-open-container">
          <div className="a" ref={aRef}></div>
          <div className="b" ref={bRef}>
            {
              <button
                onClick={() => {
                  dispatch(closeReplyPage());
                }}
              >
                close
              </button>
            }
          </div>
          <div className="c" ref={cRef}></div>
          <div className="d" ref={dRef}></div>
        </div>
      ) : (
        <ChannelSection roomName={roomName} roomMessages={rm} />
      )}
    </div>
  );
};

export default ChannelPage;
