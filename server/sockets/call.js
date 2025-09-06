module.exports = function callHandlers(io, socket, userSocketMap) {
    socket.on("set:incoming-call", (call) => {
        socket
            .to(userSocketMap.get(call.to))
            .emit("get:incoming-call", { from: call.from, type: call.type });
    });

    socket.on("call:end", ({ from, to }) => {
        socket.to(userSocketMap.get(to)).emit("call:end", { from, to });
    });

    socket.on("call:accept", ({ from, to }) => {
        socket.to(userSocketMap.get(to)).emit("call:accept", { from, to });
    });

    // fix broadcast

    socket.on("webrtc:offer", ({ offer, to }) => {
        socket.to(userSocketMap.get(to)).emit("webrtc:offer", { offer });
    });

    socket.on("webrtc:answer", ({ answer, to }) => {
        socket.to(userSocketMap.get(to)).emit("webrtc:answer", { answer });
    });

    socket.on("webrtc:candidate", ({ candidate, to }) => {
        socket
            .to(userSocketMap.get(to))
            .emit("webrtc:candidate", { candidate });
    });
};
