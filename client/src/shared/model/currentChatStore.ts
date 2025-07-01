import type { Message } from "@/features/Chat/sendMessege/model/types/Message";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentChatStore = defineStore("currentChat", () => {
    const currentRoom = ref("");
    const messages = ref<Message[]>([]);

    return { currentRoom, messages };
});
