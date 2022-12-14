import React from "react";
import "./friend-tag.scss";
import { useNavigate } from "react-router-dom";
import { setupSelectRoom } from "../../features/channel/channelSlice";
import { useDispatch } from "react-redux";
import { setupSelectTmsm } from "../../features/tmsm/tmsmSlice";
import { setupSelectFriend } from "../../features/directMessage/directMessageSlice";
import { useSelector } from "react-redux";
import { concateUserId } from "../../utils/concateUserId";
const FriendTag = ({ friend }) => {
  const { uid } = useSelector((store) => store.user);
  const { userName, rid } = friend;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const DMId = concateUserId(uid, rid);
  const isSelf = uid === rid;

  return (
    <div
      className="friend-tag-container"
      onClick={() => {
        dispatch(setupSelectRoom(null));
        dispatch(setupSelectFriend(friend));
        dispatch(setupSelectTmsm(null));
        navigate(`/app/adm/${DMId}`);
      }}
    >
      <div className="showed-section">
        #
        <h4 className="title">
          {isSelf ? (
            <div>
              {userName} <span>(you)</span>
            </div>
          ) : (
            userName
          )}
        </h4>
      </div>
    </div>
  );
};

export default FriendTag;
