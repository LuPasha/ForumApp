import React from "react";
import "./friend-tag.scss";
import { useNavigate } from "react-router-dom";
import { setupSelectRoom } from "../../features/channel/channelSlice";
import { useDispatch } from "react-redux";
import { setupSelectTmsm } from "../../features/tmsm/tmsmSlice";
import { setupSelectFriend } from "../../features/directMessage/directMessageSlice";

const FriendTag = ({ friend }) => {
  const { userName, rid } = friend;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div
      className="friend-tag-container"
      onClick={() => {
        dispatch(setupSelectRoom(null));
        dispatch(setupSelectFriend(friend));
        dispatch(setupSelectTmsm(null));
        navigate(`/app/adm/${rid}`);
      }}
    >
      <div className="showed-section">
        #<h4 className="title">{userName}</h4>
      </div>
    </div>
  );
};

export default FriendTag;
