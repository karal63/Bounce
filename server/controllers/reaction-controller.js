const ReactionService = require("../services/reaction-service");
const { userSocketMap, io } = require("../socket");

const reactionService = new ReactionService();

class ReactionController {
    async add(req, res, next) {
        try {
            const { message, stickerId } = req.body;

            const newReaction = await reactionService.add(
                req.user,
                message,
                stickerId
            );
            if (!newReaction) return res.sendStatus(200);

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

    async handleClick(req, res, next) {
        try {
            const { message, reaction } = req.body;

            await reactionService.handleClick(req.user, reaction, message);

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ReactionController;
