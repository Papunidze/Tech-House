import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../action/auth";
import { comment } from "../../action/quest";
const Comment = ({ commentsProperties, id, com }) => {
  return (
    <>
      <div className="g-comment-container">
        <header>
          <span>
            <span style={{ fontSize: "20px" }}>
              <b>{commentsProperties.author}</b>{" "}
            </span>
            <span style={{ color: "#403e3e" }}>
              <b>Asked: </b>
            </span>
          </span>
        </header>
        <main className="g-comment">
          <span>{commentsProperties.comment}</span>
        </main>
      </div>
      <hr />
    </>
  );
};
const Comments = ({ setComment, id, comments, questionsProperties }) => {
  const date = new Date();
  const [commentsProperties, setCommentsProperties] = useState({
    user: "Comment User",
    date: {
      month: ` ${date.toLocaleString("en-US", {
        month: "long",
      })}`,
      day: date.getDate(),
      year: date.getFullYear(),
    },
    isLiked: false,
    comment: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe(JSON.parse(localStorage.getItem("profile"))));
  }, [dispatch]);
  const user = useSelector((state) => state.UserReducer);
  const handleSendClick = () => {
    const name = {
      author: user.result.name + " " + user.result.lastname,
    };
    const commentS = { comment: commentsProperties.comment };
    const finalResult = Object.assign(name, commentS);
    dispatch(comment(finalResult, questionsProperties._id));
    setCommentsProperties({
      ...commentsProperties,
      comment: "",
    });
  };
  const comment2 = useSelector((state) => state.questReducer);
  const commentProp = comment2.filter((element) => element._id === id);
  return (
    <>
      <div
        className="hidden-background"
        onClick={() => setComment(false)}
      ></div>
      <motion.div
        animate={{ y: 0 }}
        initial={{ y: -200 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 1 }}
        className="center-div"
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="all-comments">
            {commentProp[0].questComment.map((commentProperties, index) => (
              <Comment
                commentsProperties={commentProperties}
                comments={comments}
                id={id}
                index={index}
                key={index}
              />
            ))}
          </div>
          <div className="comment-inputs">
            <div>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  placeholder="Comment..."
                  value={commentsProperties.comment}
                  onChange={(e) =>
                    setCommentsProperties({
                      ...commentsProperties,
                      comment: e.target.value,
                    })
                  }
                />
                <button
                  onClick={
                    commentsProperties.comment !== ""
                      ? handleSendClick
                      : () => alert("Please Fill Question Blank")
                  }
                >
                  <FiSend size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Comments;
