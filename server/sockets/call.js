module.exports = function callHandlers(io, socket, userSocketMap) {
    socket.on("set:incoming-call", (call) => {
        socket
            .to(userSocketMap.get(call.to))
            .emit("get:incoming-call", call.from);
    });

    socket.on("call:end", ({ from, to }) => {
        socket.to(userSocketMap.get(to)).emit("call:end", { from, to });
    });

    socket.on("call:accept", ({ from, to }) => {
        socket.to(userSocketMap.get(to)).emit("call:accept", { from, to });
    });

    // fix broadcast

    socket.on("webrtc:offer", ({ offer }) => {
        console.log("webrtc:offer");
        socket.broadcast.emit("webrtc:offer", { offer });
    });

    socket.on("webrtc:answer", ({ answer }) => {
        console.log("webrtc:answer");

        socket.broadcast.emit("webrtc:answer", { answer });
    });

    socket.on("webrtc:candidate", ({ candidate }) => {
        console.log("webrtc:candidate");

        socket.broadcast.emit("webrtc:candidate", { candidate });
    });
};
