import { apiUnbanUser } from "../api/unbanUser";
import { useSettingsMembersStore } from "./store";

export const useUnbanUser = () => {
    const store = useSettingsMembersStore();
    const unbanUser = async (id?: string) => {
        try {
            if (!id) return;
            await apiUnbanUser(id);
            store.bannedUsers = store.bannedUsers?.filter(
                (user) => user.id !== id
            );
        } catch (error) {
            console.log(error);
        }
    };

    return { unbanUser };
};
