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

    socket.on("offer", ({ offer }) => {
        console.log("receiver offer");
        socket.broadcast.emit("offer", { offer });
    });

    socket.on("answer", ({ answer }) => {
        console.log("receiver answer");
        socket.broadcast.emit("answer", { answer });
    });

    socket.on("candidate", ({ candidate }) => {
        console.log("receiver candidate");
        socket.broadcast.emit("candidate", { candidate });
    });
};
