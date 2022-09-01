import "./user-icon-dropdown.scss";
import { useSelector, useDispatch } from "react-redux";
import UserIconProfile from "../user-icon/user-icon-profile";
import { signOutUser } from "../../utils/firebase";
import { resetUser, toggleIcon } from "../../features/user/userSlice";

const UserIconDropdown = () => {
  const { userName } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // const { user, setUser, setIsUserProfileOpen, profile } =
  //   useContext(UserContext);

  // let displayName;
  // let email;

  // if (profile) {
  //   displayName = profile.displayName;
  //   email = profile.email;
  // } else {
  //   email = user.email;
  //   displayName = "Anonymous";
  // }

  // const navigate = useNavigate();
  const signOutHandler = async () => {
    await signOutUser();
    dispatch(resetUser());
  };

  // const goToCart = () => {
  //   setIsUserProfileOpen(false);
  //   navigate("/checkout");
  // };
  // const goToProfile = () => {
  //   setIsUserProfileOpen(false);
  //   navigate("/user-profile");
  // };
  return (
    <div
      className="user-profile-dropdown-outer-container"
      onClick={() => {
        dispatch(toggleIcon());
      }}
    >
      <div className="user-profile-dropdown-container">
        <div className="header-container">
          <div className="logo-container">
            <UserIconProfile userName={userName} />
          </div>
          <div className="user-info">
            <div className="name">{userName}</div>
          </div>
        </div>
        <div className="block">My Cart</div>
        <div className="block">My Profile</div>
        <div className="block" onClick={signOutHandler}>
          LogOut
        </div>
      </div>
    </div>
  );
};

export default UserIconDropdown;
