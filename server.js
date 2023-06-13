const express = require("express");
const app = express();
const proxy = require("express-http-proxy");

app.use("/", express.static("build"));
app.use("/api", proxy("http://127.0.0.1:3001"));

app.listen(3000, () => {
  console.log("Starting on 3000 port");
});
