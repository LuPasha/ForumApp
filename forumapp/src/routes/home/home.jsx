import "./home.scss";
import Sidebar from "../../component/sidebar/sidebar";

import Mainbody from "../../component/mainbody/mainbody";
import AddChannelPopup from "../../component/addChannelPopup/add-channel-popup";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAddChannelPopupOpen } = useSelector((store) => store.channel);
  return (
    <div className="home-container">
      {isAddChannelPopupOpen && <AddChannelPopup />}

      <Sidebar></Sidebar>

      <Mainbody></Mainbody>
    </div>
  );
};

export default Home;
