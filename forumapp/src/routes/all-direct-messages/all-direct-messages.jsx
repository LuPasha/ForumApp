import React from "react";
import { Routes, Route } from "react-router-dom";
import "./all-direct-messages.scss";
import DirectMessagePage from "../../component/direct-message-page/direct-message-page";
import AllDirectMessagesPage from "../../component/all-direct-message-page/all-direct-messages-page";

const AllDirectMessages = () => {
  return (
    <Routes>
      <Route index element={<AllDirectMessagesPage />} />
      <Route path=":id" element={<DirectMessagePage />} />
    </Routes>
  );
};

export default AllDirectMessages;
