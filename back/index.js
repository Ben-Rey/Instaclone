const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");
const decodeIDToken = require("./authenticateToken");
const postsRouter = require("./controllers/posts");

const app = express();
app.use(cors());
app.use(decodeIDToken);
app.use(express.json());

var server = require("http").Server(app);
const socketio = require("socket.io");
// socket.io
io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// now all request have access to io
app.use(function (req, res, next) {
  req.io = io;
  next();
});

mongoose
  .connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log("Error connecting database", err.message));

app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("Hello ynov toulouse");
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Serveur is running on port ${PORT}`);
});
