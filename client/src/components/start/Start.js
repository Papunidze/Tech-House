import React from "react";
import { Link } from "react-router-dom";
import bodyImg from "../../image/bodyImg.png";
import "./start.css";
const Start = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="body">
          <div className="body_text">
            <h1>
              Take assignments, complete them! Raise your rating and become an
              experienced developer
            </h1>
            <h1>Start with one line of code, and then keep building on it</h1>
            <div className="auth_btn">
              <Link to="/authorization">
                <button type="submit">Get Start</button>
              </Link>
            </div>
          </div>
          <div className="body-img">
            <img src={bodyImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
