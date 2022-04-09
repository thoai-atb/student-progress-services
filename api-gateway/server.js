const gateway = require("fast-gateway");
const server = gateway({
  routes: [
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
  ],
});

server.start(8094);
