import React, { useState } from "react";
import "./authorization.css";
import Signin from "./Signin";
import righImg from "../../image/loginback.jpg";
import Signup from "./Signup";
const Authorization = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="authorization__container">
      <section className="authorization_overwiev">
        <aside className="authorization__leftside">
          {signIn ? (
            <>
              <Signin />
              <label className="authorization_bottom">
                Don't have an account yet?{" "}
                <span onClick={() => setSignIn(false)}>Sign up</span>
              </label>
            </>
          ) : (
            <>
              <Signup />
              <label className="authorization_bottom">
                have an account?
                <span onClick={() => setSignIn(true)}>Sign In</span>
              </label>
            </>
          )}
        </aside>
        <aside className="authorization__rightside">
          <img src={righImg} alt="" />
        </aside>
      </section>
    </div>
  );
};

export default Authorization;
