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
import InputTextareaWithReply from "../input-textarea/input-textarea-with-reply";
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
  }, [id]);
  useEffect(() => {
    if (isReplyPageOpen) {
      const a = aRef.current;
      const b = bRef.current;
      const c = cRef.current;
      const d = dRef.current;

      const aStyles = window.getComputedStyle(a);
      let aWidth = parseInt(aStyles.width, 10);
      const bStyles = window.getComputedStyle(b);
      let bWidth = parseInt(bStyles.width, 10);
      const cStyles = window.getComputedStyle(c);
      let cWidth = parseInt(cStyles.width, 10);
      let x = 0;

      const onMouseMove = (event) => {
        const dx = event.clientX - x;
        x = event.clientX;

        aWidth = aWidth + dx;
        cWidth = cWidth + dx;
        bWidth = bWidth - dx;

        a.style.width = `${aWidth}px`;
        b.style.width = `${bWidth}px`;
        c.style.width = `${cWidth}px`;
      };

      const onMouseUp = (event) => {
        document.removeEventListener("mousemove", onMouseMove);
      };
      const onMouseDown = (event) => {
        x = event.clientX;
        a.style.left = aStyles.left;
        a.style.right = null;

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };
      d.addEventListener("mousedown", onMouseDown);
    }
  }, [isReplyPageOpen]);

  return (
    <div className="channel-page-container">
      {isReplyPageOpen ? (
        <div className="reply-page-open-container">
          <div className="a" ref={aRef}>
            <ChannelSectionWithReply roomName={roomName} roomMessages={rm} />
          </div>
          <div className="b" ref={bRef}>
            <div className="d" ref={dRef} />
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
          <div className="c" ref={cRef}>
            <InputTextareaWithReply />
          </div>
        </div>
      ) : (
        <div className="reply-close-page-container">
          <ChannelSection roomName={roomName} roomMessages={rm} />

          <InputTextarea />
        </div>
      )}
    </div>
  );
};

export default ChannelPage;
