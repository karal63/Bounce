const { getIO } = require("../socket");

class MessageController {
    async sendMessage(req, res, next) {
        try {
            const io = getIO();
            const messageBody = req.body;
            const message = messageBody[0];

            io.emit("message", message);
            res.status(200).json(message);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
}

module.exports = MessageController;
