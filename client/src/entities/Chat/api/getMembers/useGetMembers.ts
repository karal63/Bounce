import { getAllMembers } from "@/entities/Chat/api/getMembers/apiGetMembers";
import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { Member } from "@/entities/Chat/model/types/Member";

export const useGetMembers = () => {
    const currentChatStore = useCurrentChatStore();
    const { socket } = useSocket();

    const getMembers = async (): Promise<Member[]> => {
        try {
            if (!socket.id || !currentChatStore.currentRoom) return [];
            const members = await getAllMembers(
                socket.id,
                currentChatStore.currentRoom
            );
            return members.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    return { getMembers };
};
