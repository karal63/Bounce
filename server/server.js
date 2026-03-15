// const { app, server } = require("./socket");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const http = require("http");
const express = require("express");
// const redisClient = require("./redisClient");

const app = express();
const server = http.createServer(app);

// Routes
app.use("/api", router);
app.use(errorMiddleware);

// Server start
server.listen(5000, async () => {
    // await redisClient.connect();
    console.log(`Server is listening on port 5000`);
});
