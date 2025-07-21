import type { MemberWithName } from "@/shared/types/Member";

export const findMemberByName = (
    members: MemberWithName[],
    name: string
): MemberWithName | undefined => {
    return members.find((member) => member.name === name);
};
