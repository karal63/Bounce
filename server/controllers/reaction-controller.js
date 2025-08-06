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
}

module.exports = ReactionController;
