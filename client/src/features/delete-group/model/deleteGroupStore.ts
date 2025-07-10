import { defineStore } from "pinia";
import { ref } from "vue";

export const useDeleteGroupStore = defineStore("deleteGroupStore", () => {
    const isDeleteModalOpen = ref(false);

    return { isDeleteModalOpen };
});
