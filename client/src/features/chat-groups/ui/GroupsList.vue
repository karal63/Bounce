<script setup lang="ts">
import { ref } from "vue";
import { useGetMessages } from "@/features/chat-messages";
import { useGetMembers } from "@/features/chat-members";
import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import GroupContext from "./GroupContext.vue";
import type { ContextGroup } from "../model/types";
import SingleGroup from "./SingleGroup.vue";
import type { Group } from "@/shared/types/Group";
import type { Member, MemberWithName } from "@/shared/types/Member";
import { hasPermissions } from "@/shared/lib/helpers/hasPermissions";
import { findMemberById } from "@/shared/lib/helpers/findMemberById";
import { useSessionStore } from "@/shared/session/model/sessionStore";

const { socket } = useSocket();
const { getMessages } = useGetMessages();
const { getMembers } = useGetMembers();
const currentChatStore = useCurrentChatStore();
const sessionStore = useSessionStore();

const emit = defineEmits<{
    (event: "openDeleteModal"): void;
    (event: "setContextGroup", group: Group): void;
}>();

const context = ref<ContextGroup>({
    isVisible: false,
    posX: 0,
    posY: 0,
});

const setGroup = async (room: number) => {
    socket.emit("set-group", {
        prevRoom: currentChatStore.currentRoom,
        newRoom: room,
    });
    currentChatStore.currentRoom = room;
    currentChatStore.messages = await getMessages();
    currentChatStore.members = await getMembers();

    if (!sessionStore.user?.id) return;
    const member = findMemberById(
        currentChatStore.members,
        sessionStore.user?.id
    );
    currentChatStore.hasPermissions = hasPermissions(member);
};

const handleClick = (e: MouseEvent) => {
    context.value.isVisible = true;
    const ulElement = e.currentTarget as HTMLElement;
    const rect = ulElement?.getBoundingClientRect();

    context.value = {
        ...context.value,
        posX: e.clientX - rect.left,
        posY: e.clientY - rect.top,
    };
};

socket.on("group-deleted", (groupId) => {
    currentChatStore.groups = currentChatStore.groups.filter(
        (group) => group.id !== Number(groupId)
    );
});

socket.on("deleted:leave-group", (deletedMember: MemberWithName) => {
    currentChatStore.currentRoom = null;
    currentChatStore.groups = currentChatStore.groups.filter(
        (group) => group.id !== deletedMember.groupId
    );
});

socket.on("member-banned", (memberId) => {
    currentChatStore.members = currentChatStore.members.filter(
        (member) => member.id !== Number(memberId)
    );
});

socket.on("to-banned:update-groups", (bannedMember: Member) => {
    currentChatStore.currentRoom = null;
    currentChatStore.groups = currentChatStore.groups.filter(
        (group) => group.id !== bannedMember.groupId
    );
    // show ban info modal
});
</script>

<template>
    <div class="relative">
        <ul
            @contextmenu.prevent="handleClick"
            class="mt-5 bg-mainHoverDarkBg rounded-xl px-3 divide-y divide-mainBorder"
        >
            <SingleGroup
                v-for="group of currentChatStore.groups"
                @setGroup="setGroup(group.id)"
                @setContextGroup="emit('setContextGroup', $event)"
                :group="group"
            />
        </ul>

        <!-- context -->
        <GroupContext
            :context="context"
            @closeContext="context.isVisible = false"
            @openDeleteModal="emit('openDeleteModal')"
        />
    </div>
</template>
