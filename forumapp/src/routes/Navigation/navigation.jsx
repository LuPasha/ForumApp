import "./navigation.scss";

import { Outlet } from "react-router-dom";

import { TimeIcon, SearchIcon, HelpIcon } from "../../assets/icons/icons";
import Sidebar from "../../component/sidebar/sidebar";
import AddChannelPopup from "../../component/addChannelPopup/add-channel-popup";
import { useSelector } from "react-redux";
import UserIcon from "../../component/user-icon/user-icon";
import UserIconDropdown from "../../component/user-icon-dropdown/user-icon-dropdown";
const Navigation = () => {
  const { isAddChannelPopupOpen } = useSelector((store) => store.channel);
  const { isDropdownOpen } = useSelector((store) => store.user);

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
          <div>
            <UserIcon />
          </div>
          {isDropdownOpen && <UserIconDropdown />}
        </div>
      </div>
      <Sidebar></Sidebar>
      {isAddChannelPopupOpen && <AddChannelPopup />}
      <Outlet />
    </>
  );
};

export default Navigation;
