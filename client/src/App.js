import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Start from "./components/start/Start";
import Page from "./util/page/Page";
import Home from "./components/home/Home";
import Post from "./components/post/Post";
import Authorization from "./components/security/Auth";
import { useState } from "react";
import CurrentPost from "./components/CurrentePost.js/CurrentPost";
import Learning from "./components/Learning/Learning";
import Questions from "./components/quest/Questions";
import Code from "./components/code/Code";
import Error from "./components/Error/Error";

function App() {
  const [currentId, setCurrentId] = useState(0);
  const user = localStorage.profile || null;
  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          {user === null ? (
            <>
              <Route exat path="*" element={<Start />}></Route>
              <Route exat path="/" element={<Start />}></Route>
              <Route
                exat
                path="/authorization"
                element={<Authorization />}
              ></Route>
            </>
          ) : (
            <>
              <Route exat path="*" element={<Error />}></Route>
              <Route
                exat
                path="/"
                element={<Page components={<Home />} />}
              ></Route>
              <Route
                exat
                path="/post"
                element={
                  <Page components={<Post setCurrentId={setCurrentId} />} />
                }
              ></Route>
              <Route
                exat
                path="/question"
                element={<Page components={<Questions />} />}
              ></Route>
              <Route
                exat
                path="/learning"
                element={<Page components={<Learning />} />}
              ></Route>
              <Route
                path="/post/:id"
                exec
                element={<Page components={<CurrentPost id={currentId} />} />}
              ></Route>
              <Route
                path="/code"
                element={<Code userId={JSON.parse(user)._id} crID={false} />}
              ></Route>
              <Route
                path="/code/:id"
                element={
                  <Page
                    components={
                      <Code userId={JSON.parse(user)._id} crID={true} />
                    }
                  />
                }
              ></Route>
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
//
