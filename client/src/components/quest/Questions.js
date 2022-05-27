import React, { useState, useEffect, createContext } from "react";
import Question from "./Question";
import "./questions.css";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../action/auth";
import FileBase from "react-file-base64";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  createQuests,
  deleteQuest,
  editQuests,
  getQuest,
} from "../../action/quest";
import { CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
export const ListContext = createContext();
const AddQuestion = ({
  questionProperties,
  setFile,
  setOpen,
  open,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Ask a question</DialogTitle>
          <DialogContent sx={{ display: "grid", gridRowGap: "1rem" }}>
            <TextField
              label="Quest"
              multiline
              margin="dense"
              rows={3}
              defaultValue={questionProperties.question}
              error={!errors.message ? false : true}
              helperText={!errors.message ? "" : "Min Length 5"}
              fullWidth
              {...register(`message`, {
                required: true,
                minLength: 5,
              })}
            />
            <div className="image-input">
              <label htmlFor="">
                <b>Please input only image:</b>{" "}
              </label>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setFile({ File: base64 })}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Button type="submit">Send</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
const Questions = () => {
  const [questionsList, setQuestionsList] = useState([]);
  const [Edit, setEdit] = useState(false);
  const [Id, setId] = useState(0);
  const [questionProperties, setQuestionPoperties] = useState({
    question: "",
    photo: "",
    comments: [],
  });
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe(JSON.parse(localStorage.getItem("profile"))));
    dispatch(getQuest());
  }, [dispatch]);
  const user = useSelector((state) => state.UserReducer);
  const quest = useSelector((state) => state.questReducer);
  const handleEditClick = (id, message, File) => {
    setQuestionPoperties({
      question: message,
    });
    setEdit(true);
    setId(id);
    setOpen(true);
  };
  const handleDeleteClick = (id) => {
    dispatch(deleteQuest(id));
  };
  const onSubmit = (data) => {
    const userId = { creatorId: user.result._id };
    const creator = {
      creator: `${user.result.name} ${user.result.lastname}`,
    };
    const finalResult = Object.assign(creator, userId, data, file);
    Edit
      ? dispatch(editQuests(finalResult, Id))
      : dispatch(createQuests(finalResult));
    setOpen(false);
    setQuestionPoperties({
      question: "",
    });
    setEdit(false);
    setId(0);
  };
  const [open, setOpen] = React.useState(false);
  return (
    <ListContext.Provider value={{ questionsList, setQuestionsList }}>
      <div className="g-add-question-btn">
        <button
          className="addBTN"
          onClick={() => {
            setOpen(true);
          }}
        >
          Ask a Question
        </button>
      </div>
      <div className="g-all-question" id="1">
        {!quest.length ? (
          <div className="loader">
            <CircularProgress />
          </div>
        ) : (
          quest.map((questionsProperties, index) => (
            <Question
              questionsProperties={questionsProperties}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              key={index}
              user={user}
              questId={index}
            />
          ))
        )}
        {open && (
          <AddQuestion
            questionProperties={questionProperties}
            setFile={setFile}
            setOpen={setOpen}
            open={open}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </ListContext.Provider>
  );
};

export default Questions;
