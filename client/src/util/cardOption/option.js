import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { deletePost } from "../../action/post";
export default function FadeMenu({
  id,
  setUpload,
  currentId,
  setCurrentPostId,
  setCurrentPost,
  post,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setCurrentPostId(event.currentTarget.id);
    const result = post.filter((id) => id._id === currentId);
    setCurrentPost(result);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const edit = () => {
    setUpload(true);
    const result = post.filter((id) => id._id === currentId);
    setAnchorEl(null);
    setCurrentPost(result);
  };
  return (
    <div>
      <IconButton
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        id={id}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl) && currentId !== ""}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={edit}>Edit</MenuItem>
        <MenuItem
          onClick={() => dispatch(deletePost(currentId)) && setAnchorEl(null)}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
