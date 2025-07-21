import type { MemberWithName } from "@/shared/types/Member";

export const findMemberById = (
    members: MemberWithName[],
    id: number | null | undefined
): MemberWithName | undefined => {
    return members.find((member) => member.userId === id);
};
