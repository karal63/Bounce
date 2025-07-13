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
            "SELECT messages.*, users.name FROM messages JOIN users ON messages.senderId = users.id WHERE groupId = ? AND isDeleted = false ORDER BY messages.sentAt ASC;",
            [groupId]
        );
        return rows;
    }

    async delete(messageId, userDto) {
        const [userRows] = await db.query(
            "SELECT * FROM users WHERE email = ?",
            [userDto.email]
        );
        const user = userRows[0];

        const [updatedRows] = await db.query(
            "UPDATE messages SET isDeleted = true WHERE messages.id = ? AND (senderId = ? OR ? IN (SELECT userId FROM members WHERE groupId = messages.groupId AND role IN ('admin', 'moderator')));",
            [messageId, user.id, user.id]
        );

        const [updatedMessage] = await db.query(
            "SELECT * FROM messages WHERE id = ?",
            [messageId]
        );

        return updatedMessage[0];
    }
}

module.exports = MessageService;
