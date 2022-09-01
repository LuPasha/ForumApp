import React from "react";
import "./direct-message-page.scss";
import { useParams } from "react-router-dom";

const DirectMessagePage = () => {
  const { id } = useParams();

  return (
    <div className="direct-message-page-container">
      <div className="header"></div>
    </div>
  );
};

export default DirectMessagePage;
