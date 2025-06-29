import { apiSendMessage } from "@/features/Chat/sendMessege/model/apiSendMessage";
import type { Message } from "@/features/Chat/sendMessege/model/types/message";

// ;
export const useSendMessage = () => {
    const send = async (message: Message) => {
        try {
            const readyMessage: Message & { sentAt: Date } = {
                ...message,
                sentAt: new Date(),
            };
            await apiSendMessage(message);
        } catch (error) {
            console.log(error);
        }
    };

    return { send };
};
