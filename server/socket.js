const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { instrument } = require("@socket.io/admin-ui");

require("dotenv").config();

const app = express();

// ✅ Middleware must be registered BEFORE creating the server
app.use(express.json());
app.use(
    cors({
        origin: [process.env.CLIENT_HOST, "https://admin.socket.io/"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            process.env.CLIENT_HOST, // your app
            "https://admin.socket.io",
        ],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    socket.on("set-group", async (room) => {
        socket.join(room);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
    });
});

instrument(io, {
    auth: false,
});

module.exports = { io, app, server };
