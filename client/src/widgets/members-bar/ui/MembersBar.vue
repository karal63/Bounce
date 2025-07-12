<script setup lang="ts">
import { MembersList } from "@/features/chat-members";
import { useUiStore } from "@/shared/model/uiStore";
const uiStore = useUiStore();
</script>

<template>
    <div v-if="uiStore.isMembersBarOpen" class="w-[300px] ml-5">
        <div class="h-16"></div>
        <MembersList />
    </div>
</template>
