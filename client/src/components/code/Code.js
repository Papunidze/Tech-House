import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./code.css";
import { useDispatch, useSelector } from "react-redux";
import { createCodes, currentCode, editCode } from "../../action/code";
import { displayToast } from "../../util/alert/alert";
import FormDialog from "./dialog";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import File from "./File";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Mycode from "./Mycode";

function Code({ userId, crID }) {
  const { id } = useParams();
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [error, setError] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(1);
  /**
   * It checks if the code fields are empty, if the title field is empty, and if the user is editing or
   * creating a new code. If the code fields are empty, it displays an error message. If the title field
   * is empty, it sets the error state to true. If the user is editing a code, it dispatches the editCode
   * action. If the user is creating a new code, it dispatches the createCodes action
   */
  const saveCode = () => {
    setError(Boolean(inputTitle.length));
    if (!Boolean(html) && !Boolean(css) && !Boolean(js)) {
      displayToast(`The code field is empty`, "error", "red");
    } else if (error) {
      const code = {
        title: inputTitle,
        html: html,
        css: css,
        javascript: js,
        creatorId: userId,
      };
      crID ? dispatch(editCode(code, id)) : dispatch(createCodes(code));
      if (!crID) {
        setHtml("");
        setCss("");
        setJs("");
        setInputTitle("");
      }
      setOpenDialog(true);
    }
  };
  /* Checking if the user is editing a code, and if so, it dispatches the currentCode action. */
  useEffect(() => {
    crID && dispatch(currentCode(id));
  }, [crID, dispatch, id]);
  const code = useSelector((state) => state.code);
  useEffect(() => {
    if (Boolean(code.code) && value === 1) {
      setHtml(code.code.html);
      setCss(code.code.css);
      setJs(code.code.javascript);
      setInputTitle(code.code.title);
    }
  }, [code, crID, value]);
  /**
   * If the user clicks the "Yes, Back to home!" button, the user will be redirected to the home page
   */
  const backHome = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Back to home!",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      } else {
        setValue(1);
      }
    });
  };
  const setSrcDoc = `
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `;
  return (
    <>
      {crID && code.isLoading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
      <div className="edit-container">
        <div className="code-header">
          <div className="head-left">
            <BottomNavigation
              showLabels
              sx={{
                width: "70%",
                backgroundColor: "transparent",
              }}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction
                label="Home"
                icon={<HomeIcon />}
                onClick={backHome}
                sx={{ color: "white" }}
              />
              <BottomNavigationAction
                label="File"
                onClick={() => crID && dispatch(currentCode(id))}
                icon={<InsertDriveFileIcon />}
                sx={{ color: "white" }}
              />
              <BottomNavigationAction
                label="My Code"
                icon={<AttachmentIcon />}
                sx={{ color: "white" }}
              />
            </BottomNavigation>
          </div>
          <div className="head-right">
            <Button sx={{ fontWeight: "600" }} onClick={saveCode}>
              Save
            </Button>
          </div>
        </div>
        <div className="code-body">
          {value === 1 || value === 0 ? (
            <File
              setInputTitle={setInputTitle}
              inputTitle={inputTitle}
              setError={setError}
              error={error}
              html={html}
              setHtml={setHtml}
              css={css}
              setCss={setCss}
              js={js}
              setJs={setJs}
            />
          ) : (
            value === 2 && (
              <Mycode userId={userId} setValue={setValue} crID={crID} />
            )
          )}
          <div className="pane">
            <iframe
              srcDoc={setSrcDoc}
              title="output"
              sandbox="allow-scripts"
              className="compiler"
              frameBorder="0"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
      {code.isLoading === false && !crID && (
        <FormDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          link={code._id}
        />
      )}
    </>
  );
}

export default Code;
