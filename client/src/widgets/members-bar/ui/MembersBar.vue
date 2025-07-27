<script setup lang="ts">
import { MembersList } from "@/features/chat-members";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useUiStore } from "@/shared/model/uiStore";

const currentChatStore = useCurrentChatStore();
const uiStore = useUiStore();
</script>

<template>
    <div
        v-if="
            uiStore.isMembersBarOpen &&
            currentChatStore.currentRoom.id &&
            currentChatStore.currentRoom.type === 'group'
        "
        class="w-[300px] mt-5 ml-2 pl-3 border-l border-mainBorder"
    >
        <MembersList />
    </div>
</template>
