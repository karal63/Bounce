import { apiKickMember } from "../api/kickMember";

export const useKickMember = () => {
    const kickMember = async (memberId: number | undefined) => {
        try {
            if (!memberId) return;
            await apiKickMember(memberId);
        } catch (error) {
            console.log(error);
        }
    };

    return { kickMember };
};
