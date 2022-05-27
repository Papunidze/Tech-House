import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../action/post";
import { useNavigate } from "react-router-dom";
import { Avatar, CardHeader, CircularProgress } from "@mui/material";
import "./card.css";
import generateAvatar from "../avatart/Avatargenerator";
import { Box } from "@mui/system";
import { getMe } from "../../action/auth";
import Upload from "../upload/Upload";
import Paginations from "../pagination/Pagination";
import FadeMenu from "../cardOption/option";
export default function PostCard({ setCurrentId }) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getPost());
    dispatch(getMe(JSON.parse(localStorage.getItem("profile"))));
  }, [dispatch]);
  const post = useSelector((state) => state.postsReducer);
  const user = useSelector((state) => state.UserReducer);
  const navigate = useNavigate();
  const [currentId, setCurrentPostId] = React.useState("");
  const [currentPost, setCurrentPost] = React.useState([]);
  const [edit, setUpload] = React.useState(false);
  const [page, setPage] = React.useState(1);
  function learnMore(id, post) {
    setCurrentId(id);
    navigate(`/post/${id}`);
  }
  return !post.length ? (
    <div className="loader">
      <CircularProgress />
    </div>
  ) : (
    <>
      <div className="card">
        {post
          .slice(
            page === 1 ? (page - 1) * 10 : (page - 1) * 10 - 1,
            page * 10 - 1
          )
          .map((element, index) => (
            <Card
              sx={{
                maxHeight: 450,
                display: "grid",
                alignItems: "flex-end",
              }}
              key={index}
            >
              <CardHeader
                avatar={<Avatar>{generateAvatar(element.Creator)}</Avatar>}
                action={
                  <>
                    {user.result._id === element.creatorId && (
                      <FadeMenu
                        setUpload={setUpload}
                        id={element._id}
                        currentId={currentId}
                        setCurrentPostId={setCurrentPostId}
                        setCurrentPost={setCurrentPost}
                        post={post}
                      />
                    )}
                  </>
                }
                title={element.Creator}
                subheader={element.createdAt.substring(0, 10)}
              />

              <CardMedia
                component="img"
                height="140"
                image={element.File}
                alt="green iguana"
              />
              <CardContent sx={{ height: "100%" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {element.Title.substring(0, 10)}
                </Typography>
                <Box
                  sx={{
                    display: "-webkit-box",
                    boxOrient: "vertical",
                    lineClamp: 2,
                    wordBreak: "break-all",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="p"
                  >
                    {element.Message.substring(0, 200)}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => learnMore(element._id, element)}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
      <div className="paginations">
        <Paginations count={Math.ceil(post.length / 10)} setPage={setPage} />
      </div>
      {edit && (
        <div
          className="upload-container"
          onClick={(e) =>
            e.target.className === "upload-container" && setUpload(!edit)
          }
        >
          <Upload
            title={currentPost[0]?.Title}
            message={currentPost[0]?.Message}
            value={currentPost[0]?.Score}
            id={currentId}
            type={"edit"}
            setUpload={setUpload}
          />
        </div>
      )}
    </>
  );
}
