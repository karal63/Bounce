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
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.CLIENT_HOST, "https://admin.socket.io"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    socket.on("set-group", async (room) => {
        socket.join(room);
    });

    socket.on("get-members-list", async ({ room, socketId }) => {
        console.log(123);
        const clients = await io.in(room).fetchSockets();
        const memberList = clients.map((client) => ({
            id: client.id,
            name: client.handshake.query.username,
            // add more custom data if needed: client.handshake.query.username, etc.
        }));
        io.to(socketId).emit("members-list", memberList);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
    });
});

instrument(io, {
    auth: false,
});

module.exports = { io, app, server };

// TODO:
// Main functionality works but app structure is kind of broken, unclear, because of this i cant commit changes
// 1. REMOVE LOGIC FROM App.vue
// optional check other edited files
