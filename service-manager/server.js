const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8099;
const routes = require("./src/routes/routes");
const { listenToServices } = require("./src/kafka/service-listener");

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

listenToServices();