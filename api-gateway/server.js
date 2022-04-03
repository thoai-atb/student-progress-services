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
  ],
});

server.start(8094);