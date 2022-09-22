import React, { useState, useEffect } from "react";
import "./direct-message-page.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { sortObjectByCreateAt } from "../../utils/sort";
import MessageBlock from "../message-block/message-block";
import ReplyButtonGroup from "../reply-button-group/reply-button-group";
import InputTextareaWithReply from "../input-textarea/input-textarea-with-reply";
import UserIconProfile from "../user-icon/user-icon-profile";

const DirectMessagePage = () => {
  const { selectFriend } = useSelector((store) => store.directMessage);
  const { uid } = useSelector((store) => store.user);
  const [dm, setDm] = useState([]);

  const { id } = useParams();
  const sortedDm = sortObjectByCreateAt(dm);
  const isSelf = uid === selectFriend.rid;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "directMessages", id), (doc) => {
      const docData = doc.data();
      setDm(docData);
    });

    return unsub;
  }, [id]);

  return (
    <div className="direct-message-page-container">
      <div className="header">
        <UserIconProfile userName={selectFriend.userName} len={28} />
        <h2 className="name">{selectFriend.userName}</h2>
      </div>
      <div className="first-block">
        {isSelf ? (
          <span>
            This space is just for you. Write down notes, list your to-dos, or
            save thoughts.
          </span>
        ) : (
          <span>This conversation is just between the two of you. </span>
        )}
      </div>
      <div>
        {sortedDm.map((m) => {
          return (
            <MessageBlock
              key={m.messageId}
              mes={m}
              Buttons={ReplyButtonGroup}
            />
          );
        })}
      </div>
      <div className="textarea">
        <InputTextareaWithReply type="directMessage" DMId={id} />
      </div>
    </div>
  );
};

export default DirectMessagePage;
