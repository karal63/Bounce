import type { Member } from "@/entities/Chat/model/types/Member";
import type { Message } from "@/features/Chat/sendMessege/model/types/Message";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentChatStore = defineStore("currentChat", () => {
    const currentRoom = ref<number | null>(null);
    const messages = ref<Message[]>([]);
    const members = ref<Member[]>([]);

    return { currentRoom, messages, members };
});
