<script setup lang="ts">
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { onMounted } from "vue";
import { useGetMessagedUsers } from "../model/useGetMessagedUsers";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import UserAvatar from "@/shared/ui/UserAvatar.vue";

const currentChatStore = useCurrentChatStore();
const sessionStore = useSessionStore();

const { getMessagedUsers } = useGetMessagedUsers();

onMounted(async () => {
    if (!sessionStore.user?.id) return;
    await getMessagedUsers(sessionStore.user?.id);
});
</script>

<template>
    <ul
        class="bg-mainHoverDarkBg rounded-md w-full max-h-max flex-col gap-2 p-2"
    >
        <li
            v-for="user of currentChatStore.messagedUsers"
            class="py-1 px-1 flex items-center justify-between gap-2 hover:bg-mainHoverOnGray rounded-xl cursor-pointer transition-all"
        >
            <div class="flex items-center gap-2">
                <UserAvatar size="40" />
                <div>
                    <h3 class="text-lg">{{ user.name }}</h3>
                </div>
            </div>
        </li>
    </ul>
</template>
