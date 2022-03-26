const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8092;
const routes = require("./src/routes/routes");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

routes(app);

app.listen(port, function () {
  console.log("Server started on port: " + port);
});
