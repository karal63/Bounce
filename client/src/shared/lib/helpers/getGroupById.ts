import type { Group } from "@/shared/types/Group";

export const getGroupById = (groups: Group[], id: number | null) => {
    if (!id) return;
    return groups.find((group) => group.id === id);
};
