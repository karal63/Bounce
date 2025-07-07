import { defineStore } from "pinia";
import { ref } from "vue";

export const sidebarStore = defineStore("sidebarStore", () => {
    const isProfileContextOpen = ref(false);

    return { isProfileContextOpen };
});
