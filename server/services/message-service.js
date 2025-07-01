const db = require("../db");
const ApiError = require("../exceptions/api-error");

class MessageService {
    async send(message) {
        const { groupId, senderId, content } = message;
        if (!content) throw ApiError.BadRequest("Message is blank.");
        await db.query(
            "INSERT INTO messages (groupId, senderId, content) VALUES (?, ?, ?);",
            [groupId, senderId, content]
        );
    }

    async getAll(groupId) {
        const [rows] = await db.query(
            "SELECT * FROM messages WHERE groupId = ?",
            [groupId]
        );
        return rows;
    }
}

module.exports = MessageService;
