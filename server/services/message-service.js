const db = require("../db");
const ApiError = require("../exceptions/api-error");

class MessageService {
    async send(message) {
        const { groupId, senderId, content } = message;
        if (!content) throw ApiError.BadRequest("Message is blank.");
        const [result] = await db.query(
            "INSERT INTO messages (groupId, senderId, content) VALUES (?, ?, ?);",
            [groupId, senderId, content]
        );

        const insertedMessageId = result.insertId;
        const [messageRows] = await db.query(
            "SELECT messages.*, users.name FROM messages JOIN users ON messages.senderId = users.id WHERE messages.id = ?",
            [insertedMessageId]
        );

        return messageRows[0];
    }

    async getAll(groupId) {
        const [rows] = await db.query(
            "SELECT messages.*, users.name FROM messages JOIN users ON messages.senderId = users.id WHERE groupId = ? ORDER BY messages.sentAt ASC;",
            [groupId]
        );
        return rows;
    }
}

module.exports = MessageService;
