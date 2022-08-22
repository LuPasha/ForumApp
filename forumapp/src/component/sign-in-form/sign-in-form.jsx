import "./sign-in-form.scss";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, setupUid } from "../../features/user/userSlice";
import { signInAuthWithEmailAndPassword } from "../../utils/firebase";
import { addRoom } from "../../features/channel/channelSlice";
import { useSelector } from "react-redux";

const SignInForm = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((store) => store.user);

  const [formAttribute, setFormAttribute] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formAttribute;

  const resetFormAttribute = () => {
    setFormAttribute({
      username: "",
      password: "",
      comfirmedPassword: "",
      email: "",
    });
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormAttribute({ ...formAttribute, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);

      dispatch(loginUser({ email: user.email, uid: user.uid }));
      dispatch(setupUid(user.uid));

      resetFormAttribute();
    } catch (error) {
      resetFormAttribute();
      console.log(error);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already Have An Account?</h2>
      <span>Sign in with your email and password </span>

      <form onSubmit={submitHandler}>
        <div className="group">
          <input
            className="form-input"
            type="email"
            name="email"
            onChange={changeHandler}
            placeholder="Email"
            value={email}
          ></input>
        </div>

        <div className="group">
          <input
            className="form-input"
            type="password"
            name="password"
            onChange={changeHandler}
            placeholder="Password"
            value={password}
          ></input>
        </div>

        <div className="button-container-outer">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
