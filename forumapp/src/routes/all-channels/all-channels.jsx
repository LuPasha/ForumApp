import React from "react";
import "./all-channels.scss";
import { Routes, Route } from "react-router-dom";
import AllChannelsPage from "../../component/all-channels-page/all-channels-page";
import ChannelPage from "../../component/channel-page/channel-page";
const AllChannels = () => {
  return (
    <Routes>
      <Route index element={<AllChannelsPage />} />
      <Route path=":id" element={<ChannelPage />} />
    </Routes>
  );
};

export default AllChannels;
