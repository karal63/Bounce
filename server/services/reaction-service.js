const { v4 } = require("uuid");
const db = require("../db");
const { io } = require("../socket");
const emitReactionUpdate = require("../helpers/emitReactionUpdate");
const getGroupedReactionPayload = require("../helpers/getGroupedReactionPayload");

class ReactionService {
    async add(userDto, message, stickerId) {
        const reactionId = v4();

        const [reactionRows] = await db.query(
            "SELECT * FROM message_reactions WHERE messageId = ? AND senderId = ? AND stickerId = ?",
            [message.id, userDto.id, stickerId]
        );
        if (reactionRows.length > 0)
            return this.handleClick(userDto, reactionRows[0], message);

        await db.query(
            "INSERT INTO message_reactions (id, messageId, stickerId, senderId) VALUES (?, ?, ?, ?)",
            [reactionId, message.id, stickerId, userDto.id]
        );
        const [rows] = await db.query(
            `SELECT
            message_reactions.*,
            stickers.sticker,
            COUNT(*) AS count
         FROM message_reactions
         JOIN stickers ON message_reactions.stickerId = stickers.id
         WHERE message_reactions.id = ?
         GROUP BY message_reactions.messageId, message_reactions.stickerId`,
            [reactionId]
        );
        return rows[0];
    }

    async handleClick(userDto, reaction, message) {
        const { id: userId } = userDto;
        const { id: messageId, groupId, recipientId, senderId } = message;
        const stickerId = reaction.stickerId;

        // Check if reaction exists
        const [[existingReaction]] = await db.query(
            `SELECT id FROM message_reactions 
         WHERE messageId = ? AND senderId = ? AND stickerId = ?`,
            [messageId, userId, stickerId]
        );

        let payload;

        if (existingReaction) {
            // Delete reaction
            payload = await getGroupedReactionPayload(
                messageId,
                stickerId,
                userId
            );

            await db.query(`DELETE FROM message_reactions WHERE id = ?`, [
                existingReaction.id,
            ]);

            emitReactionUpdate(
                "reactionRemoved",
                payload,
                groupId,
                recipientId,
                senderId
            );
        } else {
            // Add reaction
            const reactionId = v4();
            await db.query(
                `INSERT INTO message_reactions (id, messageId, stickerId, senderId)
             VALUES (?, ?, ?, ?)`,
                [reactionId, messageId, stickerId, userId]
            );

            payload = await getGroupedReactionPayload(
                messageId,
                stickerId,
                userId
            );

            emitReactionUpdate(
                "reactionAdded",
                payload,
                groupId,
                recipientId,
                senderId
            );
        }
    }

    async getAll(roomId) {
        const [reactions] = await db.query(
            `SELECT message_reactions.* FROM message_reactions 
            JOIN messages 
            ON messages.id = message_reactions.messageId
            WHERE messages.groupId = ? OR messages.recipientId = ? OR messages.senderId = ?`,
            [roomId, roomId, roomId]
        );
        return reactions;
    }
}

module.exports = ReactionService;
