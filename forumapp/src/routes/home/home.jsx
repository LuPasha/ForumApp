import "./home.scss";
import Sidebar from "../../component/sidebar/sidebar";

import Mainbody from "../../component/mainbody/mainbody";

const Home = () => {
  return (
    <div className="home-container">
      <Sidebar></Sidebar>

      <Mainbody></Mainbody>
    </div>
  );
};

export default Home;
