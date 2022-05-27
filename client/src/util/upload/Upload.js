import { TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import "./upload.css";
import { useDispatch, useSelector } from "react-redux";
import { createPosts, editPosts } from "../../action/post";
import FileBase from "react-file-base64";
import { getMe } from "../../action/auth";
const Upload = (props) => {
  const [alignment, setAlignment] = React.useState(props.value || 5);
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe(JSON.parse(localStorage.getItem("profile"))));
  }, [dispatch]);
  const user = useSelector((state) => state.UserReducer);
  /**
   * It takes the data from the form, adds the alignment score, the user's name, the file, and the user's
   * id to the data, and then either creates a new post or edits an existing post depending on the type
   * of form
   * @param data - The data that is passed from the form.
   */
  const onSubmit = (data) => {
    if (user.result) {
      const name = { Creator: user.result.name + " " + user.result.lastname };
      const score = { Score: alignment };
      const userId = { creatorId: user.result._id };
      const finalResult = Object.assign(data, score, name, file, userId);
      props.type === "new"
        ? dispatch(createPosts(finalResult))
        : dispatch(editPosts(finalResult, props.id));
    }
    props.setUpload(false);
  };
  return (
    <form className="upload-overwiev" onSubmit={handleSubmit(onSubmit)}>
      <h1>Create Post</h1>
      <div className="upload-header">
        <TextField
          label="Title"
          id="outlined-size-small"
          defaultValue={props.title}
          error={!errors.Title ? false : true}
          helperText={!errors.Title ? "" : "Min Length 2"}
          size="small"
          {...register(`Title`, {
            required: true,
            minLength: 2,
          })}
        />
        <aside className="score">
          <span>Score</span>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
            }}
            onChange={handleChange}
          >
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
            <ToggleButton value={15}>15</ToggleButton>
          </ToggleButtonGroup>
        </aside>
      </div>
      <TextField
        label="Description"
        multiline
        rows={3}
        defaultValue={props.message}
        error={!errors.Message ? false : true}
        helperText={!errors.Message ? "" : "Min Length 10"}
        fullWidth
        {...register(`Message`, {
          required: true,
          minLength: 10,
        })}
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={({ base64 }) => setFile({ File: base64 })}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        fullWidth
      >
        Submit
      </Button>
    </form>
  );
};

export default Upload;
