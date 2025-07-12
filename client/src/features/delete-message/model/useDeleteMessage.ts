import { apiDeleteMessage } from "@/shared/api/message/deleteMessage";

export const useDeleteMessage = () => {
    const deleteMessage = async (messageId: number) => {
        try {
            await apiDeleteMessage(messageId);
        } catch (error) {
            console.log(error);
        }
    };

    return { deleteMessage };
};
