import { getAllMembers } from "@/shared/api/member/getMembers";
import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { MemberWithName } from "@/entities/member/index";

export const useGetMembers = () => {
    const currentChatStore = useCurrentChatStore();
    const { socket } = useSocket();

    const getMembers = async (): Promise<MemberWithName[]> => {
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
