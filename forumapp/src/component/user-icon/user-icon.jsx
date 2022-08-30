import "./user-icon.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleIcon } from "../../features/user/userSlice";
const UserIcon = () => {
  const { userName, isDropdownOpen } = useSelector((store) => store.user);
  const letter = userName?.slice(0, 1);
  const dispatch = useDispatch();

  return (
    <div
      className="user-icon-smaller-container"
      onClick={() => {
        dispatch(toggleIcon());
      }}
    >
      <div className="black-circle"></div>
      <span>{letter}</span>
    </div>
  );
};

export default UserIcon;
