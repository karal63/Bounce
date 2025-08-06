const { v4 } = require("uuid");
const db = require("../db");

class ReactionService {
    async add(messageId, stickerId) {
        const reactionId = v4();
        await db.query(
            "INSERT INTO message_reactions (id, messageId, stickerId) VALUES (?, ?, ?)",
            [reactionId, messageId, stickerId]
        );
        const [rows] = await db.query(
            "SELECT message_reactions.id, message_reactions.messageId, stickers.sticker FROM message_reactions JOIN stickers ON message_reactions.stickerId = stickers.id WHERE message_reactions.id = ?",
            [reactionId]
        );
        return rows[0];
    }
}

module.exports = ReactionService;
