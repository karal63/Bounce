<script setup lang="ts">
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import SingleMember from "./SingleMember.vue";
import { useSocket } from "@/shared/config/useSocketStore";
import { ref } from "vue";
import type { Context } from "@/shared/types/Context";
import ProfileContext from "./ProfileContext.vue";
import ActionsContext from "./ActionsContext.vue";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import type { MemberWithName } from "@/shared/types/Member";

const { socket } = useSocket();

const currentChatStore = useCurrentChatStore();
const membersListRef = ref<HTMLElement | null>(null);

const memberContext = ref<Context<MemberWithName>>({
    isVisible: false,
    posX: 0,
    posY: 0,
    type: null,
    user: null,
});

socket.on("member-joined", (newMember) => {
    currentChatStore.members.push(newMember);
});

socket.on("member-left", (memberId) => {
    currentChatStore.members = currentChatStore.members.filter(
        (member) => member.userId !== Number(memberId)
    );
});

socket.on("member-kicked", (memberId) => {
    currentChatStore.members = currentChatStore.members.filter(
        (member) => member.id !== Number(memberId)
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
