const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const todoSequelize = require("./util/db");
const port = process.env.PORT || 3003;
const { reqLogger } = require("./util/middleware");
const playlistsRouter = require("./routes/playlists");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
require("./models"); // make sure to require it

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(reqLogger);

app.use("/api/playlists", playlistsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

const start = async () => {
  try {
    await todoSequelize.authenticate();
    console.log("DB Connection Successful");
    await todoSequelize.sync({ alter: true });
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.log("Error in db connection or starting the server.");
  }
};

start();