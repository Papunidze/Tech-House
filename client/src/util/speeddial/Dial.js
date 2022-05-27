import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PrintIcon from "@mui/icons-material/Print";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SearchIcon from "@mui/icons-material/Search";
import Upload from "../upload/Upload";
export default function SpeedDialTooltipOpen() {
  const [open, setOpen] = React.useState(false);
  const [upload, setUpload] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{
          position: "fixed",
          right: 15,
          bottom: 15,
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          icon={<FileUploadIcon />}
          tooltipTitle={"Upload"}
          tooltipOpen
          onClick={() => setUpload(true)}
        />
        <SpeedDialAction
          icon={<SearchIcon />}
          tooltipTitle={"Search"}
          tooltipOpen
          onClick={handleClose}
        />
        <SpeedDialAction
          icon={<PrintIcon />}
          tooltipTitle={"Print"}
          tooltipOpen
          onClick={handleClose}
        />
      </SpeedDial>
      {upload && (
        <div
          className="upload-container"
          onClick={(e) =>
            e.target.className === "upload-container" && setUpload(!upload)
          }
        >
          <Upload type={"new"} setUpload={setUpload} />
        </div>
      )}
    </>
  );
}
