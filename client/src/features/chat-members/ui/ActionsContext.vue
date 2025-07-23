<script setup lang="ts">
import type { Context } from "@/shared/types/Context";
import { useMemberStore } from "../model/memberStore";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import { onMounted, ref } from "vue";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { getPermissions } from "@/shared/lib/helpers/getPermissions";
import { useKickMemberStore } from "@/features/kick-member";
import { useBanMemberStore } from "@/features/ban-member";
import { useSocket } from "@/shared/config/useSocketStore";
import { useGetMessages } from "@/features/chat-messages";
import type { MemberWithName } from "@/shared/types/Member";
import type { CurrentRoom } from "@/shared/types/CurrentRoom";

const props = defineProps<{
    memberContext: Context<MemberWithName>;
}>();
const emit = defineEmits<{
    (event: "closeContext"): void;
}>();

const memberStore = useMemberStore();
const sessionStore = useSessionStore();
const currentChatStore = useCurrentChatStore();
const kickMemberStore = useKickMemberStore();
const banMemberStore = useBanMemberStore();
const { socket } = useSocket();
const { getMessages } = useGetMessages();

const contextRef = ref<HTMLElement | null>(null);
const permissions = ref({
    canDelete: false,
});

useClickOutside(contextRef, () => emit("closeContext"));

onMounted(() => {
    if (!sessionStore.user?.id || !memberStore.selectedMember?.id) return;
    permissions.value = getPermissions(
        sessionStore.user?.id,
        memberStore.selectedMember?.userId,
        currentChatStore.members
    );
});

const kick = () => {
    kickMemberStore.isConfirmModalOpen = true;
};

const ban = () => {
    banMemberStore.isConfirmModalOpen = true;
};

const openConversation = async () => {
    // socket.emit("leave-group", currentChatStore.currentRoom);
    // if (!props.memberContext.user?.name) return;
    // currentChatStore.currentRoom = {
    //     id: props.memberContext.user.id,
    //     private: true,
    // };
    // currentChatStore.messages = await getMessages();
    // currentChatStore.members = [];
    // props.memberContext.isVisible = false;
    // delete functionalities i want to do with socket 💚
    // i dont need to join a new room as it is setted as default user index 💚
    // the b on the server create functionality where group id you will assume as receiverId
    // separate chat view from conversation view
    // use new git command for separating commits you learned yesterday
};
</script>

<template>
    <div
        ref="contextRef"
        class="absolute w-[100px] bg-mainGray p-1 rounded-md border border-mainHoverOnGray flex-col gap-1"
        :style="{
            left: `calc(${memberContext.posX}px - 60%)`,
            top: `calc(${memberContext.posY}px - 20%)`,
        }"
    >
        <button
            @click="openConversation"
            class="w-full text-left px-1 py-1 cursor-pointer hover:bg-mainHoverOnGray rounded-md"
        >
            Message
        </button>
        <button
            v-if="permissions.canDelete"
            @click="kick"
            class="w-full text-left px-1 py-1 cursor-pointer text-red-500 hover:bg-mainHoverOnGray rounded-md"
        >
            Kick
        </button>
        <button
            v-if="permissions.canDelete"
            @click="ban"
            class="w-full text-left px-1 py-1 cursor-pointer text-red-500 hover:bg-mainHoverOnGray rounded-md"
        >
            Ban
        </button>
    </div>
</template>
