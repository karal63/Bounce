import type { MemberWithName } from "@/entities/Chat/model/types/Member";
import type { MessageWithName } from "@/features/Chat/sendMessege/model/types/Message";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentChatStore = defineStore("currentChat", () => {
    const currentRoom = ref<number | null>(null);
    const messages = ref<MessageWithName[]>([]);
    const members = ref<MemberWithName[]>([]);

    return { currentRoom, messages, members };
});
