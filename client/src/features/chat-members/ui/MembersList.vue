<script setup lang="ts">
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import SingleMember from "./SingleMember.vue";

const currentChatStore = useCurrentChatStore();
console.log(currentChatStore.members);
</script>

<template>
    <ul class="divide-y divide-mainGray mt-5">
        <SingleMember
            v-for="member of currentChatStore.members"
            :member="member"
        />
    </ul>
</template>
