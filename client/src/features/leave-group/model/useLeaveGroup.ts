import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiLeaveGroup } from "../api/leaveGroup";

export const useLeaveGroup = () => {
    const currentChatStore = useCurrentChatStore();

    const leaveGroup = async (groupId: number) => {
        try {
            await apiLeaveGroup(groupId);
            currentChatStore.groups = currentChatStore.groups.filter(
                (group) => group.id !== groupId
            );
        } catch (error) {
            console.log(error);
        }
    };

    return { leaveGroup };
};
