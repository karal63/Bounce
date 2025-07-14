<script setup lang="ts">
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import SingleMember from "./SingleMember.vue";
import { useSocket } from "@/shared/config/useSocketStore";

const { socket } = useSocket();

const currentChatStore = useCurrentChatStore();

socket.on("member-joined", (newMember) => {
    currentChatStore.members.push(newMember);
});

socket.on("member-left", (memberId) => {
    currentChatStore.members = currentChatStore.members.filter(
        (member) => member.userId !== Number(memberId)
    );
});
</script>

<template>
    <ul class="divide-y divide-mainGray mt-5">
        <SingleMember
            v-for="member of currentChatStore.members"
            :member="member"
        />
    </ul>
</template>
