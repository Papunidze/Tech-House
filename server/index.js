/* This is the main file of the server. */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import postRoutes from "./routes/post.js";
import codeRouters from "./routes/code.js";
import questRouter from "./routes/quest.js";
import Error from "./module/errorScheme.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/user", userRouter);
app.use("/post", postRoutes);
app.use("/code", codeRouters);
app.use("/quest", questRouter);
const CONNECTION_URL =
  "mongodb+srv://Papunidze:Papunidze1337@portal.4xbpm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

/* This is a function that is called when an error occurs. */
process.on("uncaughtException", function (err) {
  let error_description = err;
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let error_date = date + " " + time;
  let newError = new Error({
    error_description,
    error_date,
  });
  newError.save();
  console.log("========================================");
  console.log(newError);
  console.log("Some error appeared , while using server");
  console.log("========================================");
});

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
