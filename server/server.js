const express = require("express");
const { createServer } = require("node:http");
require("dotenv").config();
const cors = require("cors");
const router = require("./router/index");
const redisClient = require("./redisClient");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error-middleware");
const socket = require("./socket");

const app = express();
const server = createServer(app);
socket.init(server);

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_HOST,
        credentials: true,
    })
);
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);

// io.on("connection", (socket) => {
//     console.log("Client connected:", socket.id);

//     socket.on("send_message", (data) => {
//         console.log("Message received from client:", data);
//         io.emit("message", data);
//     });

//     socket.on("disconnect", () => {
//         console.log("Client disconnected:", socket.id);
//     });
// });

server.listen(process.env.PORT, async () => {
    await redisClient.connect();
    console.log(`Server is listening on port ${process.env.PORT}`);
});
