import { apiBanMember } from "../api/banMember";
import { useBanMemberStore } from "./banMemberStore";

export const useBanMember = () => {
    const banMemberStore = useBanMemberStore();
    const banMember = async (
        memberId: number | undefined,
        banReason: string
    ) => {
        try {
            if (!memberId) return;
            await apiBanMember(memberId, banReason);
            banMemberStore.isConfirmModalOpen = false;
        } catch (error) {
            console.log(error);
        }
    };

    return { banMember };
};
