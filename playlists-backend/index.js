const express = require("express");
const app = express();
require("dotenv").config();
const todoSequelize = require("./util/db");
const port = process.env.PORT || 3003;
const { reqLogger } = require("./util/middleware");
const playlistsRouter = require("./routes/playlists");
require("./models"); // make sure to require it

// middleware
app.use(express.json());
app.use(reqLogger);
app.use("/api/playlists", playlistsRouter);

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