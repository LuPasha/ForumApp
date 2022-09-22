import "./user-icon-profile.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleIcon } from "../../features/user/userSlice";
const UserIconProfile = ({ userName, len }) => {
  const letter = userName?.slice(0, 1);

  return (
    <div
      className="user-icon-profile-container"
      style={{
        height: len,
        width: len,
        borderRadius: len / 2,
      }}
    >
      <div className="black-circle"></div>
      <span style={{ fontSize: len / 2 }}>{letter}</span>
    </div>
  );
};

export default UserIconProfile;
