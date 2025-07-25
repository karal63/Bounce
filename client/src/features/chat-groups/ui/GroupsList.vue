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
import { useRouter } from "vue-router";

const { socket } = useSocket();
const { getMessages } = useGetMessages();
const { getMembers } = useGetMembers();
const currentChatStore = useCurrentChatStore();
const sessionStore = useSessionStore();
const router = useRouter();

const emit = defineEmits<{
    (event: "openDeleteModal"): void;
    (event: "setContextGroup", group: Group): void;
}>();

const context = ref<ContextGroup>({
    isVisible: false,
    posX: 0,
    posY: 0,
});

const setGroup = async (room: string) => {
    socket.emit("set-group", {
        prevRoom: currentChatStore.currentRoom.id,
        newRoom: room,
    });
    currentChatStore.currentRoom = {
        id: room,
        type: "group",
    };
    currentChatStore.messages = await getMessages();
    currentChatStore.members = await getMembers();

    if (!sessionStore.user?.id) return;
    const member = findMemberById(
        currentChatStore.members,
        sessionStore.user?.id
    );
    currentChatStore.hasPermissions = hasPermissions(member);
    router.push(`/chat/${currentChatStore.currentRoom.id}`);
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
        (group) => group.id !== groupId
    );
});

socket.on("deleted:leave-group", (deletedMember: MemberWithName) => {
    currentChatStore.currentRoom = {
        id: null,
        type: null,
    };
    currentChatStore.groups = currentChatStore.groups.filter(
        (group) => group.id !== deletedMember.groupId
    );
});

socket.on("member-banned", (memberId) => {
    currentChatStore.members = currentChatStore.members.filter(
        (member) => member.id !== memberId
    );
});

socket.on("to-banned:update-groups", (bannedMember: Member) => {
    currentChatStore.currentRoom = {
        id: null,
        type: null,
    };
    currentChatStore.groups = currentChatStore.groups.filter(
        (group) => group.id !== bannedMember.groupId
    );
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
