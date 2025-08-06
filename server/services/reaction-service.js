const db = require("../db");

class ReactionService {
    async add(messageId, stickerId) {
        await db.query(
            "INSERT INTO message_reactions (id, messageId, stickerId) VALUES (UUID(), ?, ?)",
            [messageId, stickerId]
        );
    }
}

module.exports = ReactionService;
