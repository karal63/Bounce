const { v4 } = require("uuid");
const db = require("../db");
const { io } = require("../socket");

class ReactionService {
    async add(userDto, message, stickerId) {
        const reactionId = v4();

        const [reactionRows] = await db.query(
            "SELECT * FROM message_reactions WHERE messageId = ? AND senderId = ? AND stickerId = ?",
            [message.id, userDto.id, stickerId]
        );
        if (reactionRows.length > 0)
            return this.delete(reactionRows[0].id, message);

        await db.query(
            "INSERT INTO message_reactions (id, messageId, stickerId, senderId) VALUES (?, ?, ?, ?)",
            [reactionId, message.id, stickerId, userDto.id]
        );
        const [rows] = await db.query(
            "SELECT message_reactions.id, message_reactions.messageId, stickers.sticker FROM message_reactions JOIN stickers ON message_reactions.stickerId = stickers.id WHERE message_reactions.id = ?",
            [reactionId]
        );
        return rows[0];
    }

    async delete(reactionId, message) {
        await db.query("DELETE FROM message_reactions WHERE id = ?", [
            reactionId,
        ]);

        if (message.groupId) {
            io.to(message.groupId).emit("deleteReaction", reactionId);
        } else if (message.recipientId) {
            const senderId = userSocketMap.get(message.senderId);
            const recipientId = userSocketMap.get(message.recipientId);
            io.to(senderId).emit("deleteReaction", reactionId);
            io.to(recipientId).emit("deleteReaction", reactionId);
        }
    }
}

module.exports = ReactionService;
