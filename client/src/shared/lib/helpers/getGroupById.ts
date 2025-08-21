import type { Group } from "@/shared/types/Group";

export const getGroupById = (
    groups: Group[],
    id: string | null | undefined
) => {
    if (!id) return;
    return groups.find((group) => group.id === id);
};
