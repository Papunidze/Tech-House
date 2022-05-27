import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentPosts } from "../../action/post";
import Comment from "../../util/comment/Comment";
import "./style.css";
const CurrentPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentPosts(id));
  }, [dispatch, id]);
  const post = useSelector((state) => state.currentPost);
  return post.length === 0 ? (
    <div className="loader">
      <CircularProgress />
    </div>
  ) : (
    <>
      <Box
        sx={{
          display: "-webkit-box",
          boxOrient: "vertical",
          lineClamp: 2,
          wordBreak: "break-all",
          overflow: "hidden",
        }}
      >
        <div className="current-post">
          <div className="section">
            <Typography variant="h4" component="h4">
              {post.Title}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">
              {post.Message}
            </Typography>
            <Typography variant="h7">Created by: {post.Creator}</Typography>
            <Typography variant="h8">
              Date: {post.createdAt.substring(0, 10)}
            </Typography>
          </div>
          <div className="img-current">
            <img
              src={
                post.File ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt=""
            />
          </div>
        </div>
      </Box>
      <Divider style={{ margin: "20px 0" }} />
      <div className="comment-section">
        <Divider style={{ margin: "20px 0" }} />

        <Box
          sx={{
            width: "80%",
            display: "grid",
            placeItems: "center",
            gridRowGap: "0.5rem",
          }}
          variant="body1"
        >
          <Typography variant="body1">
            <strong>Comment</strong>
          </Typography>

          <Comment comments={post.postComment || []} creator={post.creatorId} />
        </Box>
        <Divider style={{ margin: "20px 0" }} />
      </div>
    </>
  );
};

export default CurrentPost;
