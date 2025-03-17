const express = require("express");
const app = express();
const bookRouter = require("./routes/bookRouter");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/book", bookRouter);
app.use("*", (req, res) => {
  res.status(404).json({
    message: "this route is not defined",
  });
});
module.exports = app;
