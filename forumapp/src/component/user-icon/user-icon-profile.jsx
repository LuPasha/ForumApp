import "./user-icon-profile.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleIcon } from "../../features/user/userSlice";
const UserIconProfile = () => {
  const { userName } = useSelector((store) => store.user);
  const letter = userName?.slice(0, 1);

  return (
    <div className="user-icon-profile-container">
      <div className="black-circle"></div>
      <span>{letter}</span>
    </div>
  );
};

export default UserIconProfile;
