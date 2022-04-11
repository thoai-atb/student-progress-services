const gateway = require("fast-gateway");
const server = gateway({
  routes: [
    {
      prefix: "/mediator-manager",
      target: "http://localhost:8090",
    },
    {
      prefix: "/general-mediator",
      target: "http://localhost:8091",
    },
    {
      prefix: "/semester-mediator",
      target: "http://localhost:8092",
    },
    {
      prefix: "/english-mediator",
      target: "http://localhost:8093",
    },
    // THIS API GATEWAY: http://localhost:8094
    {
      prefix: "/course",
      target: "http://localhost:8095",
    },
    {
      prefix: "/lecturer",
      target: "http://localhost:8096",
    },
    {
      prefix: "/certification",
      target: "http://localhost:8097",
    },
    {
      prefix: "/iuoss",
      target: "http://localhost:8098",
    },
    {
      prefix: "/service-manager",
      target: "http://localhost:8099",
    },
  ],
});

server.start(8094);
