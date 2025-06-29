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
        console.log(`Socket ${socket.id} joining room: ${room}`);
        socket.join(room);
        console.log([...socket.rooms]);
        const socketsInRoom = await io.in("Group_2ap").allSockets();
        console.log("Sockets in 'Group_2ap':", socketsInRoom); // Should show socket IDs
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
    });
});

instrument(io, {
    auth: false,
});

module.exports = { io, app, server };
