import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import generateAvatar from "../avatart/Avatargenerator";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userScores } from "../../action/post";
import { Typography } from "@mui/material";
export default function /* A component that is used to display the comments of a post. */
AlignItemsList(props) {
  const comment = props.comment;
  const dispatch = useDispatch();
  const { id } = useParams();
  function giveScore(score, userid) {
    const value = { _id: userid, score: Number(score) };
    dispatch(userScores(value, id));
  }
  function filtrText(text) {
    text = text.split(" ");
    let array = [];
    const regex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
    text.forEach((element) => {
      element.match(regex)
        ? array.push({
            url: element + " ",
          })
        : array.push({
            text: element + " ",
          });
    });
    return array;
  }

  return (
    <>
      {comment.map((element, index) => (
        <List sx={{ width: "100%", bgcolor: "transparante" }} key={index}>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar>{generateAvatar(element.author)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={element.author}
              className="comments-body"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {filtrText(element.comment).map((element) =>
                      element.text ? (
                        element.text
                      ) : (
                        <a
                          href={element.url}
                          style={{ color: "blue", textDecoration: "underline" }}
                        >
                          {element.url}
                        </a>
                      )
                    )}
                  </Typography>
                </React.Fragment>
              }
            />
            {props.score ? (
              <Rating
                name="size-small"
                defaultValue={element.score}
                size="small"
                onChange={(e) => giveScore(e.target.value, element.authorId)}
              />
            ) : (
              <Rating
                name="size-small"
                value={element.score}
                size="small"
                readOnly
              />
            )}
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      ))}
    </>
  );
}
