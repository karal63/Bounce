import { apiSendMessage } from "./apiSendMessage";

export const useSendMessage = () => {
    const send = async (message) => {
        try {
            console.log(message);
            await apiSendMessage(message);
        } catch (error) {
            console.log(error);
        }
    };

    return { send };
};
