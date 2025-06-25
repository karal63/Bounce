import { defineStore } from "pinia";
import { ref } from "vue";

export const useChatStore = defineStore("chatStore", () => {
    const isProfileContextOpen = ref(false);

    return { isProfileContextOpen };
});
