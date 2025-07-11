import { defineStore } from "pinia";
import { ref } from "vue";
import type { Group } from "@/shared/types/Group";

export const useDeleteGroupStore = defineStore("deleteGroupStore", () => {
    const isDeleteModalOpen = ref(false);
    const contextGroup = ref<Group>();

    return { isDeleteModalOpen, contextGroup };
});
