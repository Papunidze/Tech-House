import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
export default function FormDialog({ openDialog, setOpenDialog, link }) {
  /**
   * When the user clicks the button, the link is copied to the clipboard and the dialog is copy text
   */
  const handleClose = () => {
    navigator.clipboard.writeText(`localhost:3000/code/${link}`);
    setOpenDialog(false);
  };
  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Copy Link</DialogTitle>
        <DialogContent sx={{ display: "flex" }}>
          <TextField
            size="small"
            autoFocus
            margin="dense"
            id="name"
            label="Link"
            type="text"
            value={window.location.href + `/${link}`}
            readOnly
            fullWidth
          />
          <Button onClick={handleClose}>
            <ContentCopyIcon />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
