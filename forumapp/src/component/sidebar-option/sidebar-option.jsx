import React from "react";
import "./sidebar-option.scss";

const SidebarOption = ({ Icon, title }) => {
  return (
    <div className="side-option-container">
      <div className="showed-section">
        <Icon />
        <h4 className="title">{title}</h4>
      </div>
    </div>
  );
};

export default SidebarOption;
