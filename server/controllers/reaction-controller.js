const ReactionService = require("../services/reaction-service");
const { userSocketMap, io } = require("../socket");

const reaction = new ReactionService();

class ReactionController {
    async add(req, res, next) {
        try {
            const { message, stickerId } = req.body;

            const newReaction = await reaction.add(message.id, stickerId);
            newReaction, message.groupId, message.senderId, message.recipientId;

            if (message.groupId) {
                io.to(message.groupId).emit("newReaction", newReaction);
            } else if (message.recipientId) {
                const senderId = userSocketMap.get(message.senderId);
                const recipientId = userSocketMap.get(message.recipientId);
                io.to(senderId).emit("newReaction", newReaction);
                io.to(recipientId).emit("newReaction", newReaction);
            }

            res.json(newReaction);
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { reactionId } = req.params;
            await reaction.delete(reactionId);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ReactionController;
