const ReactionService = require("../services/reaction-service");

const reaction = new ReactionService();

class ReactionController {
    async add(req, res, next) {
        try {
            const { messageId } = req.params;
            const { stickerId } = req.body;

            const newReaction = await reaction.add(messageId, stickerId);
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
