const { io } = require("../socket");
const MessageService = require("../services/message-service");
const { userSocketMap } = require("../socket");

const messageService = new MessageService();

class MessageController {
    async sendGroupMessage(req, res, next) {
        try {
            const { message, room } = req.body;
            const { newMessage, mentionedUsersId, messageAttachments } =
                await messageService.send(message);

            io.to(room).emit("newMessage", {
                newMessage,
                attachments: messageAttachments,
            });

            if (mentionedUsersId) {
                for (const mentionId of mentionedUsersId) {
                    const targetSocketId = userSocketMap.get(String(mentionId));
                    if (targetSocketId) {
                        io.to(targetSocketId).emit(
                            "mention:show-notification",
                            newMessage
                        );
                    }
                }
            }

            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async sendDirectMessage(req, res, next) {
        try {
            const { message, room } = req.body;
            const { newMessage, mentionedUsersId, messageAttachments } =
                await messageService.send(message);

            const senderSocketId = userSocketMap.get(message.senderId);
            const receiverSocketId = userSocketMap.get(room);

            io.to(senderSocketId).emit("newMessage", {
                newMessage,
                attachments: messageAttachments,
            });
            io.to(receiverSocketId).emit("newMessage", {
                newMessage,
                attachments: messageAttachments,
            });

            io.to(receiverSocketId).emit(
                "mention:show-notification",
                newMessage
            );

            res.sendStatus(200);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getMessages(req, res, next) {
        try {
            const { userId, type, recipientId } = req.params;
            const messages = await messageService.getAll(
                userId,
                type,
                recipientId
            );
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

    async getAttachments(req, res, next) {
        try {
            const { roomId } = req.params;
            const attachments = await messageService.getAttachments(roomId);
            res.status(200).json(attachments);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    async getReactions(req, res, next) {
        try {
            const { roomId } = req.params;
            const reactions = await messageService.getReactions(
                roomId,
                req.user
            );
            res.status(200).json(reactions);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = MessageController;
