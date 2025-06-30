import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentChatStore = defineStore("currentChat", () => {
    const currentRoom = ref("");

    return { currentRoom };
});
