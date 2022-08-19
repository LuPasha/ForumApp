import "./navigation.scss";

import { Outlet } from "react-router-dom";

import { TimeIcon, SearchIcon, HelpIcon } from "../../assets/icons/icons";

const Navigation = () => {
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
      <Outlet />
    </>
  );
};

export default Navigation;
