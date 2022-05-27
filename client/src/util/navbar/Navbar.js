import React, { useEffect, useState } from "react";
import "./navbar.css";
import generateAvatar from "../../util/avatart/Avatargenerator";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import logo from "../../image/logo.svg";
import { Backdrop } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import menu from "./menu";
import { getMe } from "../../action/auth";
import Setting from "../setting/Setting";
import Profile from "../../profile/Profile";
const Navbar = () => {
  const [setting, setSetting] = useState(false);
  const [togleMenu, setToglemenu] = useState(false);
  const [userSetting, setUserSetting] = useState(false);
  const [profile, setProfile] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe(JSON.parse(localStorage.getItem("profile"))));
  }, [dispatch]);
  const user = useSelector((state) => state.UserReducer);
  return (
    <>
      <div className="navbar">
        <section className="logo">
          <div className="burgermenu">
            {!togleMenu ? (
              <MenuIcon onClick={() => setToglemenu(true)} />
            ) : (
              <CloseIcon onClick={() => setToglemenu(false)} />
            )}
          </div>
          <img src={logo} alt="" />
        </section>
        <section className="components">{menu()}</section>
        <section className="user" onClick={() => setSetting(!setting)}>
          {user.result && (
            <>
              {generateAvatar(`${user.result.name} ${user.result.lastname}`)}
              <span>{user.result.name}</span>
            </>
          )}
          <section
            className="user-settings"
            style={{ display: !setting && "none" }}
          >
            <button onClick={() => setProfile(true)}>
              <AccountCircleIcon />
              <label>Profile</label>
            </button>
            <button onClick={() => setUserSetting(true)}>
              <SettingsIcon />
              <label>Settings</label>
            </button>
            <button onClick={() => dispatch({ type: "LOGOUT" })}>
              <LogoutIcon />
              <label>Log Out</label>
            </button>
          </section>
        </section>
        {
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              display: "grid",
            }}
            open={togleMenu}
            className="mobile-menu"
            onClick={() => setToglemenu(false)}
          >
            {menu()}
          </Backdrop>
        }
      </div>
      {userSetting && (
        <div
          className="upload-container"
          onClick={(e) =>
            e.target.className === "upload-container" &&
            setUserSetting(!userSetting)
          }
        >
          <Setting
            currentPassword={user.result.password}
            id={user.result._id}
          />
        </div>
      )}
      {profile && (
        <div
          className="upload-container"
          onClick={(e) =>
            e.target.className === "upload-container" && setProfile(!profile)
          }
        >
          <Profile User={user} />
        </div>
      )}
    </>
  );
};

export default Navbar;
