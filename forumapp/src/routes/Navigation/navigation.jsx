import "./navigation.scss";

import { Outlet } from "react-router-dom";

import { TimeIcon, SearchIcon, HelpIcon } from "../../assets/icons/icons";
import Sidebar from "../../component/sidebar/sidebar";
import AddChannelPopup from "../../component/addChannelPopup/add-channel-popup";
import { useSelector } from "react-redux";
const Navigation = () => {
  const { isAddChannelPopupOpen } = useSelector((store) => store.channel);
  return (
    <>
      <div className="navigation-container">
        <div className="left-section">APP_LOGO</div>
        <div className="middle-section">
          <button>
            <TimeIcon />
          </button>
          <input></input>
          <button>
            <SearchIcon />
          </button>
        </div>
        <div className="right-section">
          <button>
            <HelpIcon />
          </button>
          <div>UserIcon</div>
        </div>
      </div>
      <Sidebar></Sidebar>
      {isAddChannelPopupOpen && <AddChannelPopup />}
      <Outlet />
    </>
  );
};

export default Navigation;
