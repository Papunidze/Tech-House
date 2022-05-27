/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import {
  AiOutlineComment,
  AiOutlineShareAlt,
  AiFillFacebook,
  AiFillLinkedin,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { BsMessenger, BsThreeDotsVertical } from "react-icons/bs";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
} from "react-share";
import Comment from "./Comments";
import generateAvatar from "../../util/avatart/Avatargenerator";

const ShowImageOnScreen = ({ photo, setImageOnScreen }) => {
  return (
    <>
      <div
        className="hidden-background"
        onClick={() => setImageOnScreen(false)}
      ></div>
      <div className="center-div">
        <img src={photo} alt="img" />
      </div>
    </>
  );
};

const Question = ({
  questionsProperties,
  handleEditClick,
  handleDeleteClick,
  questId,
  user,
}) => {
  const [imageOnScreen, setImageOnScreen] = useState(false);
  const { photo } = questionsProperties;
  const [comment, setComment] = useState(false);
  const location = window.location.href;
  const [toggle, setToggle] = useState(false);
  return (
    <>
      {comment && (
        <Comment
          setComment={setComment}
          id={questionsProperties._id}
          comments={questionsProperties.questComment}
          questionsProperties={questionsProperties}
        />
      )}
      {imageOnScreen && (
        <ShowImageOnScreen photo={photo} setImageOnScreen={setImageOnScreen} />
      )}
      <div className="question">
        <section style={{ width: "100%" }}>
          <header>
            <div className="header">
              <div className="image-place">
                {generateAvatar(questionsProperties.creator)}
              </div>
              <div className="text-place">
                <div className="date">
                  <span style={{ fontSize: "20px" }}>
                    <b>{questionsProperties.creator}</b>
                  </span>
                  <span style={{ color: "#403e3e" }}>
                    <b>Asked: </b>
                  </span>
                  {questionsProperties.createdAt.substring(0, 10)}
                  {(user.result._id === questionsProperties.creatorId ||
                    user.result.xp > 20000) && (
                    <AnimateSharedLayout>
                      <motion.span
                        layout
                        initial={{ borderRadius: 25 }}
                        className="three-points"
                      >
                        <motion.div
                          layout
                          onClick={() => setToggle(!toggle)}
                          initial={{ borderRadius: 10 }}
                        >
                          <BsThreeDotsVertical size={25} cursor="pointer" />
                          <AnimatePresence>
                            {toggle && (
                              <div className="del-edit">
                                <div
                                  onClick={() =>
                                    handleEditClick(
                                      questionsProperties._id,
                                      questionsProperties.message,
                                      questionsProperties.File
                                    )
                                  }
                                >
                                  Edit <AiFillEdit />
                                </div>
                                <div
                                  onClick={() =>
                                    handleDeleteClick(questionsProperties._id)
                                  }
                                >
                                  Delete <AiFillDelete />
                                </div>
                              </div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </motion.span>
                    </AnimateSharedLayout>
                  )}
                </div>
                <div className="question-place">
                  {questionsProperties.message}
                </div>
                <div>
                  {questionsProperties.File !== "" && (
                    <img
                      src={questionsProperties.File}
                      alt=""
                      onClick={() => setImageOnScreen(true)}
                      width="100xp"
                    />
                  )}
                </div>
              </div>
            </div>
          </header>
          <footer className="reactions">
            <div className="reactions">
              <span onClick={() => setComment(true)}>
                <AiOutlineComment className="icon" size={40} />
                <span className="comments">Comments</span>
              </span>
              <span className="box">
                <span className="top">
                  <p>
                    <AiOutlineShareAlt size={23} />
                  </p>
                </span>
                <div className="bottom"></div>

                <a href="#">
                  <FacebookShareButton url={location}>
                    <AiFillFacebook size={27} color="#1867cf" />
                  </FacebookShareButton>
                </a>
                <a href="#">
                  <FacebookMessengerShareButton url={location}>
                    <BsMessenger size={23} color="#1867cf" />
                  </FacebookMessengerShareButton>
                </a>
                <a href="#">
                  <LinkedinShareButton url={location}>
                    <AiFillLinkedin size={27} color="#1867cf" />
                  </LinkedinShareButton>
                </a>
              </span>
            </div>
          </footer>
        </section>
      </div>
    </>
  );
};

export default Question;
