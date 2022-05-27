import React from "react";
import { Button } from "@mui/material";
import { RiLock2Fill } from "react-icons/ri";
import { MdAlternateEmail } from "react-icons/md";
import { FcUnlock } from "react-icons/fc";
import logo from "../../image/logo.svg";
import InputAdornment from "@mui/material/InputAdornment";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signin } from "../../action/auth";
export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmitSign = (data) => {
    dispatch(signin(data));
  };
  return (
    <form className="auth__form" onSubmit={handleSubmit(onSubmitSign)}>
      <span className="auth__text">Hello Again!!</span>
      <img src={logo} alt="" />
      <span className="auth__text">
        Login Your Account <FcUnlock />
      </span>
      <TextField
        label="Email"
        size="small"
        type="text"
        error={!errors.password ? false : true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              {<MdAlternateEmail />}
            </InputAdornment>
          ),
        }}
        {...register(`email`, {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          minLength: 4,
        })}
      />
      <TextField
        label="Password"
        size="small"
        error={!errors.password ? false : true}
        type="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">{<RiLock2Fill />}</InputAdornment>
          ),
        }}
        {...register(`password`, {
          required: true,
          minLength: 6,
        })}
      />
      <Button variant="contained" type="submit">
        Log in
      </Button>
    </form>
  );
}
