import React, { useEffect, useState } from "react";
import SidebarOption from "../sidebar-option/sidebar-option";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import RoomTag from "../roomTag/roomTag";
import { sortArrayByCreateAt } from "../../utils/sort";

import {
  addRoom,
  openAddChannelPopupOpen,
  setupRooms,
} from "../../features/channel/channelSlice";

import { setupUserRooms } from "../../features/user/userSlice";

import {
  MoreIcon,
  ChatIcon,
  AtIcon,
  FolderIcon,
  DownArrowIcon,
  AddIcon,
  BookMarkIcon,
  LeftArrowIcon,
} from "../../assets/icons/icons";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../utils/firebase";
import { setupUserName } from "../../features/user/userSlice";
import { setupReservedWords } from "../../features/reservedWords/reservedWordsSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { userRooms, currentUser } = useSelector((store) => store.user);

  const { selectRoom } = useSelector((store) => store.channel);

  const [showChannels, setShowChannels] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userChannels", currentUser?.uid),
      (doc) => {
        const docData = doc.data();
        if (docData !== undefined) {
          const roomData = Object.values(docData);

          dispatch(setupUserRooms(roomData));
        }
      }
    );

    return unsub;
  }, [dispatch, currentUser]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUser?.uid), (doc) => {
      const docData = doc.data();
      dispatch(setupUserName(docData.displayName));
    });
    return unsub;
  }, [currentUser, dispatch]);

  const sortedUr = sortArrayByCreateAt(userRooms);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "reservedWord", "words"), (doc) => {
      const docData = doc.data();
      dispatch(setupReservedWords(Object.values(docData)));
    });
    return unsub;
  }, [dispatch]);

  return (
    <div className="side-bar-container">
      <div className="sidebar-header">
        <h2>this is a header </h2>
      </div>
      <div className="sidebar-shortcuts">
        <SidebarOption Icon={ChatIcon} title="Threads" />
        <SidebarOption Icon={AtIcon} title="Mentions & replies" />
        <div
          onClick={() => {
            navigate("/app/saved");
          }}
        >
          <SidebarOption Icon={BookMarkIcon} title="Saved Items" />
        </div>
        <SidebarOption Icon={MoreIcon} title="More" />
      </div>
      <div className="channel-message-section">
        <div className="channel-section">
          <div
            onClick={() => {
              setShowChannels(!showChannels);
            }}
          >
            <SidebarOption
              Icon={showChannels ? DownArrowIcon : LeftArrowIcon}
              title="Channels"
            />
          </div>

          {showChannels
            ? sortedUr.map((room) => {
                return <RoomTag key={room.roomId} room={room} />;
              })
            : selectRoom && (
                <RoomTag key={selectRoom.roomId} room={selectRoom} />
              )}
          <div
            onClick={() => {
              dispatch(openAddChannelPopupOpen());
            }}
          >
            <SidebarOption Icon={AddIcon} title="Add channels" />
          </div>
        </div>
        <div className="message-section">
          <SidebarOption Icon={DownArrowIcon} title="Direct Messages" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
