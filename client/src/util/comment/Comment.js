import React, { useEffect } from "react";
import AlignItemsList from "./CommentCard";
import "./style.css";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { comment } from "../../action/post";
import { getMe } from "../../action/auth";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DirectionsIcon from "@mui/icons-material/Directions";
import generateAvatar from "../avatart/Avatargenerator";
const Comment = (props) => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe(JSON.parse(localStorage.getItem("profile"))));
  }, [dispatch]);
  const user = useSelector((state) => state.UserReducer);
  const onSubmit = (value) => {
    const name = {
      author: user.result.name + " " + user.result.lastname,
    };
    const userId = { authorId: user.result._id };
    const finalResult = Object.assign(userId, name, value, { score: 0 });
    dispatch(comment(finalResult, id));
    reset();
  };
  const setScore = user.result?._id === props.creator;
  return (
    <div className="comment">
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
        id="comment-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          {generateAvatar(user.result.name + " " + user.result.lastname)}
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Comment"
          {...register(`comment`, {
            required: true,
            minLength: 1,
          })}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          type="submit"
        >
          <DirectionsIcon />
        </IconButton>
      </Paper>
      {props.comments.length > 0 && (
        <AlignItemsList comment={props.comments} score={setScore} />
      )}
    </div>
  );
};

export default Comment;
