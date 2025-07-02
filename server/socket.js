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
    // let prevRoom;

    socket.on("set-group", async (room) => {
        // if (prevRoom) socket.leave(prevRoom);
        socket.join(room);
        // prevRoom = room;

        // setTimeout(async () => {
        //     console.log(room);
        //     const clients = await io.in(room).fetchSockets();
        //     const memberList = clients.map((client) => ({
        //         id: client.id,
        //         name: client.handshake.query.username, // or wherever you're storing it
        //     }));

        //     io.to(room).emit("members-list", memberList);
        //     io.to(socket.id).emit("members-list", memberList);
        // }, 100); // Delay 100ms to allow join to complete
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
