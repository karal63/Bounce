const db = require("../db");
const ApiError = require("../exceptions/api-error");
const { v4 } = require("uuid");

class MessageService {
    async send(message) {
        const {
            groupId,
            recipientId,
            senderId,
            content,
            replyToMessageId,
            mentionedUsersId,
            attachments,
        } = message;
        if (!content && attachments.length < 1)
            throw ApiError.BadRequest("Message is blank.");

        const messageId = v4();

        if (groupId) {
            await db.query(
                "INSERT INTO messages (id, groupId, senderId, content, replyToMessageId) VALUES (?, ?, ?, ?, ?);",
                [messageId, groupId, senderId, content, replyToMessageId]
            );
        } else if (recipientId) {
            await db.query(
                "INSERT INTO messages (id, recipientId, senderId, content, replyToMessageId) VALUES (?, ?, ?, ?, ?);",
                [messageId, recipientId, senderId, content, replyToMessageId]
            );
        }

        for (const attachment of attachments) {
            await db.query(
                "INSERT INTO message_images (id, messageId, imageUrl) VALUES (UUID(), ?, ?);",
                [messageId, attachment.url]
            );
        }

        const [messageRows] = await db.query(
            "SELECT messages.*, users.name, users.avatarUrl FROM messages JOIN users ON messages.senderId = users.id WHERE messages.id = ?",
            [messageId]
        );

        const [attachmentsRows] = await db.query(
            "SELECT * FROM message_images WHERE messageId = ?",
            [messageId]
        );

        return {
            newMessage: messageRows[0],
            mentionedUsersId,
            messageAttachments: attachmentsRows,
        };
    }

    async getAll(userId, type, recipientId) {
        if (type === "group") {
            const [rows] = await db.query(
                "SELECT messages.*, users.name, users.avatarUrl FROM messages JOIN users ON messages.senderId = users.id WHERE groupId = ? AND isDeleted = false ORDER BY messages.sentAt ASC;",
                [recipientId]
            );
            return rows;
        } else if (type === "direct") {
            const [rows] = await db.query(
                "SELECT messages.*, users.name, users.avatarUrl FROM messages JOIN users ON messages.senderId = users.id WHERE (messages.recipientId = ? AND messages.senderId = ?) || (messages.senderId = ? AND messages.recipientId = ?) AND messages.isDeleted = false AND groupId IS NULL ORDER BY messages.sentAt ASC;",
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

    async getAttachments(roomId) {
        const [attachments] = await db.query(
            "SELECT message_images.* FROM message_images JOIN messages ON message_images.messageId=messages.id WHERE messages.groupId = ? OR messages.recipientId = ? OR messages.senderId = ?",
            [roomId, roomId, roomId]
        );

        return attachments;
    }

    async getReactions(roomId, userDto) {
        const [reactions] = await db.query(
            `SELECT
                    message_reactions.*,
                    stickers.sticker,
                    COUNT(*) AS count
                FROM message_reactions
                JOIN messages ON message_reactions.messageId = messages.id
                JOIN stickers ON message_reactions.stickerId = stickers.id
                WHERE messages.groupId = ? OR messages.recipientId = ? OR messages.senderId = ?
                GROUP BY message_reactions.messageId, message_reactions.stickerId`,
            [roomId, roomId, roomId]
        );

        return reactions;
    }
}

module.exports = MessageService;
