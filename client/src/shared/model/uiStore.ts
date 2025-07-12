import { defineStore } from "pinia";
import { ref } from "vue";

export const useUiStore = defineStore("uiStore", () => {
    const isMembersBarOpen = ref(false);

    const toggleMembersBar = () => {
        isMembersBarOpen.value = !isMembersBarOpen.value;
    };

    return { isMembersBarOpen, toggleMembersBar };
});
