import { AxiosError } from "axios";
import { useDeleteGroupStore } from "./deleteGroupStore";
import { apiDeleteGroup } from "../api/deleteGroup";

export const useDeleteGroup = () => {
    const deleteGroupStore = useDeleteGroupStore();

    const deleteGroup = async () => {
        // make request
        // filter array

        try {
            if (!deleteGroupStore.contextGroup?.id) return;
            await apiDeleteGroup(deleteGroupStore.contextGroup?.id);
            deleteGroupStore.error = "";
            deleteGroupStore.isDeleteModalOpen = false;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response?.data);
                deleteGroupStore.error = error.response?.data;
            } else {
                console.log(error);
            }
        }
    };

    return { deleteGroup };
};
