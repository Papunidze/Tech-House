import { Avatar, Paper } from "@mui/material";
import React from "react";
import currentLvl from "../lvl/Lvl";
import currentXp from "../lvl/xp";
import generateAvatar from "../util/avatart/Avatargenerator";
import "./profile.css";
const Profile = ({ User }) => {
  let xp = currentXp(currentLvl(User.result.xp));
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        minWidth: "250px",
        maxWidth: "100%",
        padding: "2rem",
        borderRadius: "20px",
        margin: "auto",
      }}
    >
      <Avatar>
        {generateAvatar(`${User.result.name} ${User.result.lastname}`)}
      </Avatar>
      <div className="user-profile">
        <h3>
          Name: <span style={{ color: "#444" }}>{User.result.name}</span>
        </h3>

        <h3>
          Lastname:{" "}
          <span style={{ color: "#444" }}>{User.result.lastname}</span>
        </h3>
      </div>
      <span>LVL: {currentLvl(User.result.xp)}</span>
      <div className="progress-bar">
        <span className="bar">
          <span
            className="progress"
            style={{
              width:
                xp !== "Max lvl" ? (xp / 100) * User.result.xp + "%" : "100%",
            }}
          ></span>
        </span>
      </div>
      {xp !== "Max lvl" ? (
        <span>
          {User.result.xp} / {xp}
        </span>
      ) : (
        <span>{xp}</span>
      )}
    </Paper>
  );
};

export default Profile;
