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

// userId -> socketId
const userSocketMap = new Map();
io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);
    const userId = socket.handshake.query.id; // pass userId in query params

    // // Save mapping
    if (userId) {
        userSocketMap.set(userId, socket.id);
    }

    socket.on("set-group", ({ prevRoom, newRoom }) => {
        if (prevRoom) socket.leave(prevRoom);
        socket.join(newRoom);
    });
    socket.on("leave-group", (room) => {
        if (!room) return;
        socket.leave(room);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
        if (userId) {
            userSocketMap.delete(userId);
        }
    });
});

instrument(io, {
    auth: false,
});

module.exports = { io, app, server, userSocketMap };
