<script setup lang="ts">
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import SingleMember from "./SingleMember.vue";
import { useSocket } from "@/shared/config/useSocketStore";
import { ref } from "vue";
import type { Context } from "@/shared/types/Context";
import ProfileContext from "./ProfileContext.vue";
import ActionsContext from "./ActionsContext.vue";

const { socket } = useSocket();

const currentChatStore = useCurrentChatStore();
const membersListRef = ref<HTMLElement | null>(null);

const memberContext = ref<Context & { type: "actions" | "profile" | null }>({
    isVisible: false,
    posX: 0,
    posY: 0,
    type: null,
});

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
    <div ref="membersListRef" class="relative">
        <ul class="flex-col gap-2">
            <SingleMember
                v-for="member of currentChatStore.members"
                :membersListRef="membersListRef"
                @setContext="(value) => (memberContext = value)"
                :member="member"
            />
        </ul>

        <ProfileContext
            v-if="memberContext.isVisible && memberContext.type === 'profile'"
            :memberContext="memberContext"
            @closeContext="memberContext.isVisible = false"
        />

        <ActionsContext
            v-if="memberContext.isVisible && memberContext.type === 'actions'"
            :memberContext="memberContext"
            @closeContext="memberContext.isVisible = false"
        />
    </div>
</template>
