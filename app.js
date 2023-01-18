const express = require("express");
const app = express();
const { PORT = 3000, BASE_PATH } = process.env;
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");

mongoose.connect("mongodb://localhost:27017/aroundb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
  console.log(BASE_PATH);
});

app.use(express.static(path.join(__dirname, "data")));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", usersRoute);
app.use("/cards", cardsRoute);
app.use("/", (req, res) => {
  res
    .status(404)
    .send({ status: false, message: "Requested resource not found" });
});
