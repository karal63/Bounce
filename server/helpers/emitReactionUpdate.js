const { io, userSocketMap } = require("../socket");

function emitReactionUpdate(event, payload, groupId, recipientId, senderId) {
    if (groupId) {
        io.to(groupId).emit(event, payload);
    } else if (recipientId) {
        const toSender = userSocketMap.get(senderId);
        const toRecipient = userSocketMap.get(recipientId);
        io.to(toSender).emit(event, payload);
        io.to(toRecipient).emit(event, payload);
    }
}

module.exports = emitReactionUpdate;
