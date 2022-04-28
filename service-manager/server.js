const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8099;
const routes = require("./src/routes/routes");
const { listenToServices } = require("./src/kafka/service-listener");
const { ServicesService } = require("./src/services/service");

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

new Promise((resolve) => setTimeout(resolve, 5000)).then(() => {
  ServicesService.refreshServices();
});
