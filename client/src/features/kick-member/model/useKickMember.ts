import { apiKickMember } from "../api/kickMember";
import { useKickMemberStore } from "./kickMemberStore";

export const useKickMember = () => {
    const kickMemberStore = useKickMemberStore();
    const kickMember = async (memberId: string | undefined) => {
        try {
            if (!memberId) return;
            await apiKickMember(memberId);
            kickMemberStore.isConfirmModalOpen = false;
        } catch (error) {
            console.log(error);
        }
    };

    return { kickMember };
};
