const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { instrument } = require("@socket.io/admin-ui");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: [process.env.CLIENT_HOST, "https://admin.socket.io/"],
        methods: ["GET", "POST", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_HOST, "https://admin.socket.io"],
        methods: ["GET", "POST", "DELETE"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);
    // let prevRoom;

    socket.on("set-group", ({ prevRoom, newRoom }) => {
        if (prevRoom) socket.leave(prevRoom);
        socket.join(newRoom);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
    });
});

instrument(io, {
    auth: false,
});

module.exports = { io, app, server };
