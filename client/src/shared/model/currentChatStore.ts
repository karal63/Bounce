import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentChatStore = defineStore("currentChat", () => {
    const currentRoom = ref("");
    const messages = ref([]);

    return { currentRoom, messages };
});
