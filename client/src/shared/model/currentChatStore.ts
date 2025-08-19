// you have to move those types into shared folder
import { ref } from "vue";
import { defineStore } from "pinia";
import type { MemberWithName } from "@/shared/types/Member";
import type { MessageWithName } from "@/shared/types/Message";
import type { Group } from "@/shared/types/Group";
import type { CurrentRoom } from "../types/CurrentRoom";
import type { MessagedUser } from "../types/MessagedUser";
import type { Attachment } from "../types/Attachment";
import type { Reaction } from "../types/Reaction";
import type { Sticker } from "../types/Sticker";
import type { TypingUser } from "../types/TypingUser";

export const useCurrentChatStore = defineStore("currentChat", () => {
    const currentRoom = ref<CurrentRoom>({
        id: null,
        type: null,
    });
    const messages = ref<MessageWithName[]>([]);
    const members = ref<MemberWithName[]>([]);
    const groups = ref<Group[]>([]);
    const hasPermissions = ref(false);
    const messagedUsers = ref<MessagedUser[]>([]);
    const attachments = ref<Attachment[]>([]);
    const reactions = ref<Reaction[]>([]);
    const allReactions = ref<Reaction[]>([]);
    const stickers = ref<Sticker[]>([]);
    const onlineUsers = ref(new Set<string>());
    const isTyping = ref(false);
    const typingUsers = ref<TypingUser[]>([]);

    return {
        currentRoom,
        messages,
        members,
        groups,
        hasPermissions,
        messagedUsers,
        attachments,
        reactions,
        allReactions,
        stickers,
        onlineUsers,
        isTyping,
        typingUsers,
    };
});
