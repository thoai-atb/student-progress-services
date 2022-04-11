const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8091;
const routes = require("./src/routes/routes");
const { startMediator } = require("./src/kafka/mediator");
const { registerService } = require("./src/kafka/service-registry");

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

startMediator();
registerService();
