import React from "react";
import UserIconProfile from "../user-icon/user-icon-profile";
import "./user-info-popup.scss";
import { MessageIcon } from "../../assets/icons/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setupSelectRoom } from "../../features/channel/channelSlice";

import { setupSelectTmsm } from "../../features/tmsm/tmsmSlice";
import { setupSelectFriend } from "../../features/directMessage/directMessageSlice";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { addDMtoDatabase } from "../../utils/firebase";

const UserInfoPopup = ({ pos, tagpos, userName, userId }) => {
  if (tagpos > 300) {
    pos = pos - 240;
  } else {
    pos = pos + 15;
  }
  const { uid } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createNewDM = () => {
    const DMId = uuid().slice(0, 12);
    const today = new Date();
    const createAt = today.getTime();
    const date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const time = today.getHours() + ":" + today.getMinutes();
    const newDM = {
      DMId,
      createAt,
      userName,
      date,
      time,
      rid: userId,
    };
    addDMtoDatabase(newDM, uid, userId);
  };

  return (
    <div className="user-info-popup-outer-container" style={{ top: pos }}>
      <div className="user-info-popup-container">
        <div className="up-section">
          <UserIconProfile userName={userName} />
        </div>
        <div className="down-section">
          <div
            className="message-button"
            onClick={() => {
              dispatch(setupSelectFriend({ userName, userId }));
              dispatch(setupSelectRoom(null));
              dispatch(setupSelectTmsm(null));
              createNewDM();
              navigate(`/app/adm/${userId}`);
            }}
          >
            <div className="icon">
              <MessageIcon />
            </div>
            <span>Message</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPopup;
