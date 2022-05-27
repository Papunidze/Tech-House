import {
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import FolderIcon from "@mui/icons-material/Folder";
import { useDispatch, useSelector } from "react-redux";
import { deleteCodes, myCode } from "../../action/code";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { Box } from "@mui/system";
const Mycode = ({ userId, setValue }) => {
  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myCode({ creatorId: userId }));
  }, [dispatch, userId]);
  const code = useSelector((state) => state.code);
  const navigation = useNavigate();
  const handleClick = (event, dl) => {
    if (!dl) {
      navigation(`/code/${event.currentTarget.id}`);
      setValue(1);
    } else {
      if (id === event.currentTarget.id) {
        window.location.href = "/code";
      }
      dispatch(deleteCodes({ _id: event.currentTarget.id }));
    }
  };
  return (
    <>
      {code.isLoading && Boolean(code.codearr) ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="mycode-container">
          <Grid item xs={12} md={6}>
            <Demo>
              {Boolean(code.codearr) && (
                <List dense={true}>
                  <ListItem
                    sx={{ cursor: "pointer" }}
                    onClick={() => (window.location.href = "/code")}
                  >
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Create New Code"} />
                  </ListItem>
                  {code.codearr.map((element, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: "1rem",
                      }}
                    >
                      <ListItem
                        sx={{ cursor: "pointer" }}
                        id={element._id}
                        key={index}
                        onClick={(event) => handleClick(event, false)}
                      >
                        <ListItemIcon id={element._id}>
                          <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                          id={element._id}
                          primary={element.title}
                          secondary={element.createdAt.substring(0, 10)}
                        />
                      </ListItem>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        id={element._id}
                        onClick={(event) => handleClick(event, true)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </List>
              )}
            </Demo>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Mycode;
