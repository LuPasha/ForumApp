import React from "react";
import "./mainbody.scss";
import { useNavigate } from "react-router-dom";

const Mainbody = () => {
  const navigate = useNavigate();
  return (
    <div className="mainbody-container">
      <h1>mainbody</h1>
      <button
        onClick={() => {
          navigate("/app/ac");
        }}
      >
        go to{" "}
      </button>
      <h1>mainbody</h1>
      <h1>mainbody</h1>
      <h1>mainbody</h1>
    </div>
  );
};

export default Mainbody;
