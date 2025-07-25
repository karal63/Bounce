import type { MemberWithName } from "@/shared/types/Member";
import { findMemberById } from "./findMemberById";

export function getPermissions(
    currentUserId: string,
    selectedMemberId: string,
    members: MemberWithName[]
): { canDelete: boolean } {
    const isNotSelf = currentUserId !== selectedMemberId;
    const currentUser = findMemberById(members, currentUserId);
    const hasPrivileges = ["admin", "moderator"].includes(
        currentUser?.role ?? ""
    );

    return {
        canDelete: isNotSelf && hasPrivileges,
    };
}
