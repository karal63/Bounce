<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useGetMessages } from "@/features/chat-messages";
import { useGetMembers } from "@/features/chat-members";
import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import GroupContext from "./GroupContext.vue";
import type { ContextGroup } from "../model/types";

const { socket } = useSocket();
const { getMessages } = useGetMessages();
const { getMembers } = useGetMembers();
const currentChatStore = useCurrentChatStore();

const emit = defineEmits<{
    (event: "openDeleteModal"): void;
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
};

const handleClick = (e: MouseEvent) => {
    context.value.isVisible = !context.value.isVisible;
    const ulElement = e.currentTarget;
    const rect = ulElement?.getBoundingClientRect();
    context.value = {
        ...context.value,
        posX: e.clientX - rect.left,
        posY: e.clientY - rect.top,
    };
};
</script>

<template>
    <div class="relative">
        <ul
            @contextmenu.prevent="handleClick"
            class="mt-5 bg-mainHoverDarkBg rounded-xl px-3 divide-y divide-mainBorder"
        >
            <li
                v-for="group of currentChatStore.groups"
                @click="setGroup(group.id)"
                class="py-3 cursor-pointer flex items-center gap-2 hover:text-purple-500 transition-all"
            >
                <Icon
                    icon="lets-icons:chat-light"
                    class="text-3xl text-grayDull"
                />{{ group.name }}
            </li>
        </ul>

        <!-- context -->
        <GroupContext
            :context="context"
            @closeContext="context.isVisible = false"
            @openDeleteModal="emit('openDeleteModal')"
        />
    </div>
</template>
