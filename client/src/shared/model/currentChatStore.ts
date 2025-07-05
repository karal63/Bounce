// you have to move those types into shared folder
import type { MemberWithName } from "@/entities/chat/model/types/Member";
import type { MessageWithName } from "@/features/Chat/sendMessege/model/types/Message";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Group } from "@/shared/types/Group";

export const useCurrentChatStore = defineStore("currentChat", () => {
    const currentRoom = ref<number | null>(null);
    const messages = ref<MessageWithName[]>([]);
    const members = ref<MemberWithName[]>([]);
    const groups = ref<Group[]>([]);

    return { currentRoom, messages, members, groups };
});
