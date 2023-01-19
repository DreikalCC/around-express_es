const express = require("express");
const app = express();
const { PORT = 3000, BASE_PATH } = process.env;
//const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");

mongoose.connect("mongodb://localhost:27017/aroundb");

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
  console.log(BASE_PATH);
});

app.use(express.static(path.join(__dirname, "data")));

app.use("/", express.json());
app.use("/", express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: "63c89c55c2c1feb5cd32c937",
  };
  next();
});

app.use("/users", usersRoute);
app.use("/cards", cardsRoute);
app.use("/", (req, res) => {
  res
    .status(404)
    .send({ status: false, message: "Requested resource not found" });
});
