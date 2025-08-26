module.exports = function callHandlers(io, socket, userSocketMap) {
    socket.on("set:incoming-call", (call) => {
        socket
            .to(userSocketMap.get(call.to))
            .emit("get:incoming-call", call.from);
    });

    socket.on("call:end", ({ from, to }) => {
        socket.to(userSocketMap.get(to)).emit("call:end", from);
    });
};
