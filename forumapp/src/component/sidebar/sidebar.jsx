import React, { useEffect, useState } from "react";
import SidebarOption from "../sidebar-option/sidebar-option";
import "./sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import RoomTag from "../roomTag/roomTag";
import { sortArrayByCreateAt } from "../../utils/sort";
import { sortObjectByCreateAt } from "../../utils/sort";

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
import { setupSelectRoom } from "../../features/channel/channelSlice";

import { setupSelectTmsm } from "../../features/tmsm/tmsmSlice";
import {
  setupFriends,
  setupSelectFriend,
} from "../../features/directMessage/directMessageSlice";
import FriendTag from "../friend-tag/friend-tag";

const Sidebar = () => {
  const { userRooms, currentUser } = useSelector((store) => store.user);

  const { selectRoom } = useSelector((store) => store.channel);
  const { friends, selectFriend } = useSelector((store) => store.directMessage);

  const sortedfriend = sortObjectByCreateAt(friends);
  console.log(sortedfriend);

  const [showChannels, setShowChannels] = useState(true);
  const [showFriends, setShowFriends] = useState(true);
  const sortedUr = sortObjectByCreateAt(userRooms);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userChannels", currentUser?.uid),
      (doc) => {
        const docData = doc.data();

        dispatch(setupUserRooms(docData));
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

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "reservedWord", "words"), (doc) => {
      const docData = doc.data();
      dispatch(setupReservedWords(Object.values(docData)));
    });
    return unsub;
  }, [dispatch]);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "friends", currentUser?.uid), (doc) => {
      const docData = doc.data();
      dispatch(setupFriends(docData));
    });
    return unsub;
  }, [dispatch, currentUser]);

  return (
    <div className="side-bar-container">
      <div className="sidebar-header"></div>
      <div className="sidebar-shortcuts">
        <div
          onClick={() => {
            dispatch(setupSelectRoom(null));
            dispatch(setupSelectFriend(null));
            dispatch(setupSelectTmsm("AC"));
            navigate("/app/ac");
          }}
        >
          <SidebarOption Icon={ChatIcon} title="All Channels" />
        </div>
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
              title="My Channels"
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
            <SidebarOption Icon={AddIcon} title="Add Channels" />
          </div>
        </div>
        <div
          className="message-section"
          onClick={() => {
            setShowFriends(!showFriends);
          }}
        >
          <SidebarOption
            Icon={showFriends ? DownArrowIcon : LeftArrowIcon}
            title="Direct Messages"
          />
        </div>
        {showFriends
          ? sortedfriend.map((f) => {
              return <FriendTag friend={f} key={f.DMId} />;
            })
          : selectFriend && <FriendTag friend={selectFriend} />}
      </div>
    </div>
  );
};

export default Sidebar;
