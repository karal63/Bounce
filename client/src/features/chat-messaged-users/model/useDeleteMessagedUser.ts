import { apiDeleteMessagedUser } from "@/shared/api/user/deleteMessagedUser";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const useDeleteMessagedUser = () => {
    const currentChatStore = useCurrentChatStore();

    const deleteMessagedUser = async (id: string) => {
        try {
            await apiDeleteMessagedUser(id);
            currentChatStore.messagedUsers =
                currentChatStore.messagedUsers.filter((user) => user.id !== id);
        } catch (error) {
            console.log(error);
        }
    };

    return { deleteMessagedUser };
};
