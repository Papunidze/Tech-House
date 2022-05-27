import React from "react";
import PostCard from "../../util/card/card";
import "./post.css";
const Post = ({ setCurrentId, setCurrentPost }) => {
  return (
    <div className="posts">
      <PostCard setCurrentId={setCurrentId} setCurrentPost={setCurrentPost} />
    </div>
  );
};

export default Post;
