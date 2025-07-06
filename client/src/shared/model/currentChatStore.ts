// you have to move those types into shared folder
import type { MemberWithName } from "@/entities/member/types/Member";
import type { MessageWithName } from "@/features/Chat/sendMessege/model/types/Message";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Group } from "@/entities/group/types/Group";

export const useCurrentChatStore = defineStore("currentChat", () => {
    const currentRoom = ref<number | null>(null);
    const messages = ref<MessageWithName[]>([]);
    const members = ref<MemberWithName[]>([]);
    const groups = ref<Group[]>([]);

    return { currentRoom, messages, members, groups };
});
