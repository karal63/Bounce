// you have to move those types into shared folder
import { ref } from "vue";
import { defineStore } from "pinia";
import type { MemberWithName } from "@/shared/types/Member";
import type { MessageWithName } from "@/shared/types/Message";
import type { Group } from "@/shared/types/Group";
import type { CurrentRoom } from "../types/CurrentRoom";

export const useCurrentChatStore = defineStore("currentChat", () => {
    const currentRoom = ref<CurrentRoom>({
        id: null,
        type: null,
    });
    const messages = ref<MessageWithName[]>([]);
    const members = ref<MemberWithName[]>([]);
    const groups = ref<Group[]>([]);
    const hasPermissions = ref(false);

    return { currentRoom, messages, members, groups, hasPermissions };
});
