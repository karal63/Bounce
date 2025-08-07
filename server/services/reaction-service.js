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
            return this.handleClick(reactionRows[0].id, message);

        await db.query(
            "INSERT INTO message_reactions (id, messageId, stickerId, senderId) VALUES (?, ?, ?, ?)",
            [reactionId, message.id, stickerId, userDto.id]
        );
        const [rows] = await db.query(
            "SELECT message_reactions.id, message_reactions.messageId, message_reactions.stickerId, stickers.sticker FROM message_reactions JOIN stickers ON message_reactions.stickerId = stickers.id WHERE message_reactions.id = ?",
            [reactionId]
        );
        return rows[0];
    }

    async handleClick(userDto, reaction, message) {
        // 2. this function is so messy, make it clean

        const [reactionRows] = await db.query(
            "SELECT * FROM message_reactions WHERE messageId = ? AND senderId = ? AND stickerId = ?",
            [message.id, userDto.id, reaction.stickerId]
        );

        console.log(reactionRows);
        const existingReaction = reactionRows[0];

        if (reactionRows.length > 0) {
            await db.query("DELETE FROM message_reactions WHERE id = ?", [
                existingReaction.id,
            ]);

            if (message.groupId) {
                io.to(message.groupId).emit("deleteReaction", existingReaction);
            } else if (message.recipientId) {
                const senderId = userSocketMap.get(message.senderId);
                const recipientId = userSocketMap.get(message.recipientId);
                io.to(senderId).emit("deleteReaction", existingReaction);
                io.to(recipientId).emit("deleteReaction", existingReaction);
            }
        } else {
            const reactionId = v4();

            await db.query(
                "INSERT INTO message_reactions (id, messageId, stickerId, senderId) VALUES (?, ?, ?, ?)",
                [reactionId, message.id, reaction.stickerId, userDto.id]
            );

            const [rows] = await db.query(
                "SELECT message_reactions.id, message_reactions.messageId, message_reactions.stickerId, stickers.sticker FROM message_reactions JOIN stickers ON message_reactions.stickerId = stickers.id WHERE message_reactions.id = ?",
                [reactionId]
            );

            // add count instead of this
            if (message.groupId) {
                io.to(message.groupId).emit("newReaction", rows[0]);
            } else if (message.recipientId) {
                const senderId = userSocketMap.get(message.senderId);
                const recipientId = userSocketMap.get(message.recipientId);
                io.to(senderId).emit("newReaction", rows[0]);
                io.to(recipientId).emit("newReaction", rows[0]);
            }
        }
    }
}

module.exports = ReactionService;
