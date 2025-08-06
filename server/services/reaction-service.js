const { v4 } = require("uuid");
const db = require("../db");

class ReactionService {
    async add(userDto, messageId, stickerId) {
        const reactionId = v4();

        const [reactionRows] = await db.query(
            "SELECT * FROM message_reactions WHERE messageId = ? AND senderId = ? AND stickerId = ?",
            [messageId, userDto.id, stickerId]
        );
        if (reactionRows.length > 0) return;
        console.log("added");

        await db.query(
            "INSERT INTO message_reactions (id, messageId, stickerId, senderId) VALUES (?, ?, ?, ?)",
            [reactionId, messageId, stickerId, userDto.id]
        );
        const [rows] = await db.query(
            "SELECT message_reactions.id, message_reactions.messageId, stickers.sticker FROM message_reactions JOIN stickers ON message_reactions.stickerId = stickers.id WHERE message_reactions.id = ?",
            [reactionId]
        );
        return rows[0];
    }

    async delete(reactionId) {
        await db.query("DELETE FROM message_reactions WHERE id = ?", [
            reactionId,
        ]);
    }
}

module.exports = ReactionService;
