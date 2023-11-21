const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const userroute = require("./route/user");

app.use(
  cors({
    origin: "https://stalwart-begonia-f86121.netlify.app/",
    methods: ["POST", "GET"],
  })
);
app.use(express.json());

mongoose.set("strictQuery", false);
var db =
  "mongodb+srv://yashmulik95:DT7baIWgP2H4aHFO@cluster0.qrpcoe4.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/user", userroute);

app.listen(3000, () => {
  console.log("server is running.");
});

//
