const { Server } = require("socket.io");

let io = null;

module.exports = {
    init: (server) => {
        io = new Server(server, {
            cors: {
                origin: process.env.CLIENT_HOST,
                methods: ["GET", "POST"],
                credentials: true,
            },
        });
        return io;
    },
    getIO: () => {
        if (!io) throw new Error("Socket.io not initialized.");
        return io;
    },
};
