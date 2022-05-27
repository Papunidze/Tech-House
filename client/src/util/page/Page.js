import React, { useEffect } from "react";
import "./page.css";
import Navbar from "../navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../action/auth";
import SpeedDialTooltipOpen from "../speeddial/Dial";
import { CircularProgress } from "@mui/material";
import currentLvl from "../../lvl/Lvl";
export default function Page(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe(JSON.parse(localStorage.getItem("profile"))));
  }, [dispatch]);
  const user = useSelector((state) => state.UserReducer);
  return !user.result ? (
    <div className="loader">
      <CircularProgress />
    </div>
  ) : (
    <>
      <div className="page">
        <div>
          <section className="overwiev">
            <Navbar />
          </section>
          <section className="page_generator">{props.components}</section>
        </div>
        {currentLvl(user.result.xp) >= 10 && <SpeedDialTooltipOpen />}
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}
