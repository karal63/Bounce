<script setup lang="ts">
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { ContextMenu } from "@/shared/ui";
import UserAvatar from "@/shared/ui/UserAvatar.vue";

const currentChatStore = useCurrentChatStore();
const sessionStore = useSessionStore();

const emit = defineEmits<{
    (e: "mention", name: string): void;
}>();
</script>

<template>
    <ContextMenu
        :left="0"
        :top="-20 * (currentChatStore.members.length - 1)"
        width="250"
    >
        <ul class="flex-col gap-1">
            <li
                v-for="mention in currentChatStore.members.filter(
                    (member) => sessionStore.user?.id !== member.userId
                )"
                :key="mention.userId"
                @click="emit('mention', mention.name)"
                class="flex items-center gap-2 hover:bg-mainHoverOnGray transition-all cursor-pointer rounded-md py-1 px-2"
            >
                <UserAvatar alt="avatar" :src="mention.avatarUrl" size="30" />
                <p>{{ mention.name }}</p>
            </li>
        </ul>
    </ContextMenu>
</template>
