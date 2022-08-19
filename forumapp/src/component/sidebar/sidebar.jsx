import React from "react";
import SidebarOption from "../sidebar-option/sidebar-option";
import "./sidebar.scss";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { addRoom } from "../../features/channel/channelSlice";

import {
  MoreIcon,
  ChatIcon,
  AtIcon,
  FolderIcon,
  DownArrowIcon,
  AddIcon,
} from "../../assets/icons/icons";

const Sidebar = () => {
  const { rooms } = useSelector((store) => store.channel);

  const dispatch = useDispatch();
  return (
    <div className="side-bar-container">
      <div className="sidebar-header">
        <h2>this is a header </h2>
      </div>
      <div className="sidebar-shortcuts">
        <SidebarOption Icon={ChatIcon} title="Threads" />
        <SidebarOption Icon={AtIcon} title="Mentions & replies" />
        <SidebarOption Icon={FolderIcon} title="Files" />
        <SidebarOption Icon={MoreIcon} title="More" />
      </div>
      <div className="channel-message-section">
        <div className="channel-section">
          <SidebarOption Icon={DownArrowIcon} title="Channels" />
          <SidebarOption Icon={AddIcon} title="Add channels" />
        </div>
        <div className="message-section">
          <SidebarOption Icon={DownArrowIcon} title="Direct Messages" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
