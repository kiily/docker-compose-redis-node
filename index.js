const express = require("express");
const redis = require("redis");
// const process = require("process");

const app = express();
const client = redis.createClient({
  // This is the name of the redis server service in the docker-compose
  host: "redis-server",
  port: 6379,
});
client.set("visits", 0);

app.get("/", (req, res) => {
  // 0 --> exit is meant to happen
  //   process.exit(0);
  client.get("visits", (err, visits) => {
    res.send(`Number of visits is ${visits}`);
    client.set("visits", parseInt(visits) + 1);
  });
});

const port = 8081;
app.listen(port, () => {
  console.log(`Listening in port ${port}`);
});
