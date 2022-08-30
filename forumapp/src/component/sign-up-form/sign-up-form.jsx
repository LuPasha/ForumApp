import "./sign-up-form.scss";

import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase";

const SignUpForm = () => {
  const [formAttribute, setFormAttribute] = useState({
    displayName: "",
    password: "",
    comfirmedPassword: "",
    email: "",
  });
  const { email, comfirmedPassword, password, displayName } = formAttribute;

  const resetFormAttribute = () => {
    setFormAttribute({
      displayName: "",
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

    if (password !== comfirmedPassword) {
      resetFormAttribute();
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, displayName);

      resetFormAttribute();
    } catch (error) {
      console.log("user auth encounter problem", error);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't Have An Account?</h2>
      <span>Sign up with your email and password </span>

      <form onSubmit={submitHandler}>
        <div className="group">
          <input
            className="form-input"
            type="text"
            name="displayName"
            onChange={changeHandler}
            placeholder="displayName"
            value={displayName}
          ></input>
        </div>
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
        <div className="group">
          <input
            className="form-input"
            type="password"
            name="comfirmedPassword"
            onChange={changeHandler}
            placeholder="Comfirmed Password"
            value={comfirmedPassword}
          ></input>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
