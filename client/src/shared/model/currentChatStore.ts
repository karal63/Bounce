// you have to move those types into shared folder
import type { MemberWithName } from "@/entities/member/model/types";
import type { MessageWithName } from "@/entities/message/model/types";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Group } from "@/entities/group/model/types";

export const useCurrentChatStore = defineStore("currentChat", () => {
    const currentRoom = ref<number | null>(null);
    const messages = ref<MessageWithName[]>([]);
    const members = ref<MemberWithName[]>([]);
    const groups = ref<Group[]>([]);

    return { currentRoom, messages, members, groups };
});
