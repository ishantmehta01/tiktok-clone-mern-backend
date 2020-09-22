import express from "express";
import mongoose from "mongoose";
import Data from "./data.js";
import Videos from "./dbModel.js";

// app config
const app = express();
const port = 9000;

//middlewares
app.use(express.json());
app.use((req, res, next) => {
  res.send("Access-Control-Allow-Origin", "*"),
    res.send("Access-Control-Allow-Headers", "*"),
    next();
});

// DB config
const connectionUrl =
  "mongodb+srv://admin:x0WL1GdDL72aiCgW@cluster0.uld4h.mongodb.net/tiktok?retryWrites=true&w=majority";
// mongodb+srv://admin:<password>@cluster0.uld4h.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// API endpoints
app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

app.get("/v1/posts", (req, res) => res.status(200).send(Data));

app.get("/v2/posts", (req, res) => {
  Videos.find((error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/v2/posts", (req, res) => {
  // POST req is to ADD Data to Database
  // It will allow us to add a VIDEO DDocument to VIDEO Collection
  const dbVideos = req.body;
  Videos.create(dbVideos, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(201).send(data);
    }
  });
});

// Listen
app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
