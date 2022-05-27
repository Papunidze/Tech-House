import React from "react";
import { useForm } from "react-hook-form";
import { FcLock } from "react-icons/fc";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { signUp } from "../../action/auth";
export default function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(signUp(data));
  };
  return (
    <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
      <h1>
        Create your account <FcLock />
      </h1>
      <TextField
        label="Name"
        size="small"
        type="text"
        error={!errors.name ? false : true}
        helperText={!errors.name ? "" : "Enter first name"}
        {...register(`name`, {
          required: true,
          pattern: /^[A-Za-z]+$/,
          minLength: 2,
        })}
      />
      <TextField
        label="Last Name"
        size="small"
        type="text"
        error={!errors.lastname ? false : true}
        helperText={!errors.lastname ? "" : "Enter surname"}
        {...register(`lastname`, {
          required: true,
          pattern: /^[A-Za-z]+$/,
          minLength: 4,
        })}
      />
      <TextField
        label="Email"
        size="small"
        type="email"
        error={!errors.email ? false : true}
        helperText={!errors.email ? "" : "Enter the correct password"}
        {...register(`email`, {
          required: true,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          minLength: 4,
        })}
      />
      <TextField
        label="Password"
        size="small"
        type="password"
        error={!errors.password ? false : true}
        helperText={!errors.password ? "" : "Minimum six characters"}
        {...register(`password`, {
          required: true,
          minLength: 6,
        })}
      />
      <TextField
        label="Repeat Password"
        size="small"
        type="password"
        error={!errors.repeatpassword ? false : true}
        helperText={
          !errors.repeatpassword ? "" : "Those passwords didn’t match."
        }
        {...register(`repeatpassword`, {
          required: true,
          validate: (value) => value === getValues("password"),
        })}
      />
      <Button variant="contained" type="submit">
        Sign Up
      </Button>
    </form>
  );
}
