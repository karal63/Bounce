import type { MemberWithName } from "@/shared/types/Member";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsMembersStore = defineStore(
    "settingsMembersStore",
    () => {
        const bannedUsers = ref<MemberWithName[] | undefined>([]);

        return { bannedUsers };
    }
);
