// you have to move those types into shared folder
import { ref } from "vue";
import { defineStore } from "pinia";
import type { MemberWithName } from "@/shared/types/Member";
import type { MessageWithName } from "@/shared/types/Message";
import type { Group } from "@/shared/types/Group";

export const useCurrentChatStore = defineStore("currentChat", () => {
    const currentRoom = ref<number | null>(null);
    const messages = ref<MessageWithName[]>([]);
    const members = ref<MemberWithName[]>([]);
    const groups = ref<Group[]>([]);

    return { currentRoom, messages, members, groups };
});
