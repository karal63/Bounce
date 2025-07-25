const db = require("../db");
const ApiError = require("../exceptions/api-error");
const { v4 } = require("uuid");

class MessageService {
    async send(message) {
        const { groupId, recipientId, senderId, content, mentionedUsersId } =
            message;
        if (!content) throw ApiError.BadRequest("Message is blank.");

        const messageId = v4();

        if (groupId) {
            await db.query(
                "INSERT INTO messages (id, groupId, senderId, content) VALUES (?, ?, ?, ?);",
                [messageId, groupId, senderId, content]
            );
        } else if (recipientId) {
            await db.query(
                "INSERT INTO messages (id, recipientId, senderId, content) VALUES (?, ?, ?, ?);",
                [messageId, recipientId, senderId, content]
            );
        }

        const [messageRows] = await db.query(
            "SELECT messages.*, users.name FROM messages JOIN users ON messages.senderId = users.id WHERE messages.id = ?",
            [messageId]
        );

        return { newMessage: messageRows[0], mentionedUsersId };
    }

    async getAll(userId, type, recipientId) {
        if (type === "group") {
            const [rows] = await db.query(
                "SELECT messages.*, users.name FROM messages JOIN users ON messages.senderId = users.id WHERE groupId = ? AND isDeleted = false ORDER BY messages.sentAt ASC;",
                [recipientId]
            );
            return rows;
        } else if (type === "direct") {
            const [rows] = await db.query(
                "SELECT messages.*, users.name FROM messages JOIN users ON messages.senderId = users.id WHERE (messages.recipientId = ? OR messages.recipientId = ?) AND (messages.recipientId = ? OR messages.recipientId = ?) AND messages.isDeleted = false AND groupId IS NULL ORDER BY messages.sentAt ASC;",
                [recipientId, userId, recipientId, userId]
            );
            return rows;
        }
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
