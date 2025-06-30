const { io } = require("../socket");

class MessageController {
    async sendMessage(req, res, next) {
        try {
            const { message, room } = req.body;
            io.to(room).emit("message", message);
            res.status(200).json(message);
        } catch (error) {
            console.log(error);
            res.sendStatus(500);
        }
    }
}

module.exports = MessageController;
