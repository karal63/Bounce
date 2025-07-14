<script setup lang="ts">
import { MembersList } from "@/features/chat-members";
import { useUiStore } from "@/shared/model/uiStore";
const uiStore = useUiStore();
</script>

<template>
    <div
        v-if="uiStore.isMembersBarOpen"
        class="w-[300px] mt-5 ml-2 pl-3 border-l border-mainBorder"
    >
        <MembersList />
    </div>
</template>
