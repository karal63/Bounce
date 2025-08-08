const emitReactionUpdate = require("../helpers/emitReactionUpdate");
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

            await emitReactionUpdate(
                "reactionAdded",
                newReaction,
                message.groupId,
                message.recipientId,
                message.senderId
            );

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

    async getAll(req, res, next) {
        try {
            const { roomId } = req.params;
            console.log(roomId);
            const allReactions = await reactionService.getAll(roomId);
            res.json(allReactions);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ReactionController;
