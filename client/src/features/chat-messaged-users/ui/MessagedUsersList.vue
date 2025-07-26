<script setup lang="ts">
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { onMounted } from "vue";
import { useGetMessagedUsers } from "../model/useGetMessagedUsers";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { useSocket } from "@/shared/config/useSocketStore";
import type { MessagedUser } from "@/shared/types/MessagedUser";
import { useGetMessages } from "@/features/chat-messages";

const currentChatStore = useCurrentChatStore();
const sessionStore = useSessionStore();
const { socket } = useSocket();
const { getMessages } = useGetMessages();

const { getMessagedUsers } = useGetMessagedUsers();

onMounted(async () => {
    if (!sessionStore.user?.id) return;
    await getMessagedUsers(sessionStore.user?.id);
});

const goToConversation = async (user: MessagedUser) => {
    if (!sessionStore.user?.id) return;

    socket.emit("set-group", {
        prevRoom: currentChatStore.currentRoom.id,
        newRoom: user.userId,
    });

    currentChatStore.currentRoom = {
        id: user.userId,
        type: "direct",
    };

    // move this api call to onMounted in chat list
    currentChatStore.messages = await getMessages();
};
</script>

<template>
    <ul
        class="bg-mainHoverDarkBg rounded-md w-full max-h-max flex-col gap-2 p-2"
    >
        <li
            v-for="user of currentChatStore.messagedUsers"
            class="cursor-pointer"
        >
            <RouterLink
                :to="'/chat/' + user.userId"
                @click="goToConversation(user)"
                class="flex items-center gap-2 py-1 px-1 rounded-xl transition-all hover:bg-mainHoverOnGray"
            >
                <UserAvatar size="40" />
                <div>
                    <h3 class="text-lg">
                        {{ user.otherUserName }}
                    </h3>
                </div>
            </RouterLink>
        </li>
    </ul>
</template>
