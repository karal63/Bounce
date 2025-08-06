const ReactionService = require("../services/reaction-service");

const reaction = new ReactionService();

class ReactionController {
    async add(req, res, next) {
        try {
            const { messageId } = req.params;
            const { stickerId } = req.body;

            await reaction.add(messageId, stickerId);
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ReactionController;
