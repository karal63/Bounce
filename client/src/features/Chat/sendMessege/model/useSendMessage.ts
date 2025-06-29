import { apiSendMessage } from "@/features/Chat/sendMessege/model/apiSendMessage";
import type { ReadyMessage } from "@/features/Chat/sendMessege/model/types/message";

export const useSendMessage = () => {
    const send = async (message: ReadyMessage) => {
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
