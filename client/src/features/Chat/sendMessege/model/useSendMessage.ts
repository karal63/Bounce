import { apiSendMessage } from "@/features/Chat/sendMessege/model/apiSendMessage";
import type {
    ReadyMessage,
    Message,
} from "@/features/Chat/sendMessege/model/types/Message";

export const useSendMessage = () => {
    const send = async (message: Message) => {
        try {
            const readyMessage: ReadyMessage = {
                ...message,
                sentAt: new Date(),
            };
            await apiSendMessage(readyMessage);
        } catch (error) {
            console.log(error);
        }
    };

    return { send };
};
