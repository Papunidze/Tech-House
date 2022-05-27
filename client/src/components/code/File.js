import React, { useEffect } from "react";
import Editor from "./Editor";
import { IoLogoHtml5, IoLogoJavascript } from "react-icons/io";
import { DiCss3Full } from "react-icons/di";
const File = ({
  setInputTitle,
  inputTitle,
  error,
  setError,
  html,
  setHtml,
  css,
  setCss,
  js,
  setJs,
}) => {
  useEffect(() => {
    inputTitle.length > 0 && setError(true);
  });
  return (
    <>
      <input placeholder="Title" className="code-title2" />
      <div className="edit-panel">
        <input
          placeholder="Title"
          className="code-title"
          defaultValue={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        {!error && (
          <span
            style={{
              color: "red",
              fontSize: "small",
              widows: "100%",
              display: "flex",
              borderRight: "4px solid #e0e0e0",
              marginLeft: "1rem",
            }}
          >
            Enter a title
          </span>
        )}

        <Editor
          language="xml"
          displayName={<IoLogoHtml5 color="rgb(141, 102, 29)" />}
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName={<DiCss3Full color="rgb(9, 98, 98)" />}
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName={<IoLogoJavascript color="rgb(182, 182, 30)" />}
          value={js}
          onChange={setJs}
        />
      </div>
    </>
  );
};

export default File;
