const db = require("../db");

async function getGroupedReactionPayload(messageId, stickerId, currentUserId) {
    const [[result]] = await db.query(
        `SELECT
            message_reactions.*,
            stickers.sticker,
            COUNT(*) AS count
         FROM message_reactions
         JOIN stickers ON message_reactions.stickerId = stickers.id
         WHERE message_reactions.messageId = ? AND message_reactions.stickerId = ?
         GROUP BY message_reactions.messageId, message_reactions.stickerId`,
        [messageId, stickerId]
    );

    return result;
}

module.exports = getGroupedReactionPayload;
