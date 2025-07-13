const { io } = require("../socket");
const MessageService = require("../services/message-service");

const messageService = new MessageService();

class MessageController {
    async sendMessage(req, res, next) {
        try {
            const { message, room } = req.body;
            const messageWithName = await messageService.send(message);
            io.to(room).emit("newMessage", messageWithName);
            res.status(200).json(message);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getMessages(req, res, next) {
        try {
            const { groupId } = req.params;
            const messages = await messageService.getAll(groupId);
            res.status(200).json(messages);
        } catch (error) {
            next(error);
        }
    }

    async deleteMessage(req, res, next) {
        try {
            const { messageId } = req.params;
            const deletedMessage = await messageService.delete(
                messageId,
                req.user
            );
            io.to(deletedMessage.groupId).emit(
                "message-deleted",
                deletedMessage.id
            );
            res.status(200).json("message deleted");
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = MessageController;
