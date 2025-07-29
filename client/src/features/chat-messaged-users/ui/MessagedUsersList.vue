<script setup lang="ts">
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { onMounted, ref } from "vue";
import { useGetMessagedUsers } from "../model/useGetMessagedUsers";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { useSocket } from "@/shared/config/useSocketStore";
import type { MessagedUser } from "@/shared/types/MessagedUser";
import { useGetMessages } from "@/features/chat-messages";
import UserContext from "./UserContext.vue";
import type { Context } from "@/shared/types/Context";

const currentChatStore = useCurrentChatStore();
const sessionStore = useSessionStore();
const { socket } = useSocket();
const { getMessages } = useGetMessages();
const { getMessagedUsers } = useGetMessagedUsers();

defineProps<{ filteredUsers: MessagedUser[] }>();

const userContext = ref<Context<MessagedUser>>({
    isVisible: false,
    posX: 0,
    posY: 0,
    user: null,
});
const contextRef = ref<HTMLElement | null>(null);

onMounted(async () => {
    if (!sessionStore.user?.id) return;
    await getMessagedUsers(sessionStore.user?.id);
});

const goToConversation = async (user: MessagedUser) => {
    if (!sessionStore.user?.id) return;

    socket.emit("set-group", {
        prevRoom: currentChatStore.currentRoom.id,
        newRoom: user.otherUserId,
    });

    currentChatStore.currentRoom = {
        id: user.otherUserId,
        type: "direct",
    };

    // move this api call to onMounted in chat list
    currentChatStore.messages = await getMessages();
};

const openContextMenu = (user: MessagedUser, e: MouseEvent) => {
    const contextPos = contextRef.value?.getBoundingClientRect();
    if (!contextPos) return;

    userContext.value = {
        isVisible: true,
        posX: e.clientX - contextPos?.left,
        posY: e.clientY - contextPos?.top + 70,
        user: user,
    };
};

const closeContext = () => {
    userContext.value = {
        isVisible: false,
        posX: 0,
        posY: 0,
        user: null,
    };
};
</script>

<template>
    <div class="relative">
        <ul
            v-if="filteredUsers.length > 0"
            ref="contextRef"
            class="bg-mainHoverDarkBg rounded-md w-full max-h-max flex-col gap-2 p-2"
        >
            <li
                v-for="user of filteredUsers"
                class="cursor-pointer"
                @contextmenu.prevent="(e) => openContextMenu(user, e)"
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

        <div v-else>No results</div>

        <UserContext :userContext="userContext" @closeContext="closeContext" />
    </div>
</template>
