import { apiRenameGroup } from "../api/renameGroup";

export const useRenameGroup = () => {
    const renameGroup = async (prevGroupId: number, newGroupName: string) => {
        try {
            await apiRenameGroup(prevGroupId, newGroupName);
        } catch (error) {
            console.log(error);
        }
    };

    return { renameGroup };
};
