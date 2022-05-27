import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
import { displayToast } from "../alert/alert";
import { useDispatch } from "react-redux";
import { changePassword } from "../../action/auth";

const Setting = ({ currentPassword, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    data.currentPassword !== currentPassword
      ? displayToast(`Inccorect Password`, "error", "red")
      : dispatch(changePassword(Object.assign(data, { _id: id })));
  };
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        width: "100%",
        padding: "2rem",
        borderRadius: "20px",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Change Password</h1>
      <TextField
        label="Current Password"
        size="small"
        type="password"
        {...register(`currentPassword`, {
          required: true,
          minLength: 6,
        })}
      />
      <TextField
        label="New Password"
        size="small"
        type="password"
        error={!errors.password ? false : true}
        helperText={!errors.password ? "" : "Minimum six characters"}
        {...register(`password`, {
          required: true,
          minLength: 6,
        })}
      />
      <Button variant="contained" endIcon={<SendIcon />} type="submit">
        Send
      </Button>
    </Paper>
  );
};

export default Setting;
