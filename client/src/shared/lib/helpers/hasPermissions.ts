import type { MemberWithName } from "@/shared/types/Member";

export const hasPermissions = (member?: MemberWithName) => {
    if (!member || !member.role) return false;

    const allowedRoles = ["admin", "moderator"];
    return allowedRoles.includes(member.role);
};
