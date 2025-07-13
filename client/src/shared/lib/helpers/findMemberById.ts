import type { MemberWithName } from "@/shared/types/Member";

export const findMemberById = (members: MemberWithName[], id: number) => {
    return members.find((member) => member.userId === id);
};
