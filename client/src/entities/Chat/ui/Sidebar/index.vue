<script setup lang="ts">
import { watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import ProfileBar from "@/entities/Chat/ui/Sidebar/ProfileBar.vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSocket } from "@/shared/config/useSocketStore";
import { useGetMessages } from "@/entities/Chat/api/getMessages/useGetMessages";
import { useGetMembers } from "@/entities/Chat/api/getMembers/useGetMembers";
import { useGetGroups } from "@/entities/Chat/api/getGroups/useGetGroups";

const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();
const { getMessages } = useGetMessages();
const { getMembers } = useGetMembers();
const { getGroups } = useGetGroups();

const emit = defineEmits<{
    (event: "logout"): void;
}>();

const setGroup = async (room: number) => {
    currentChatStore.currentRoom = room;
    currentChatStore.messages = await getMessages();
    currentChatStore.members = await getMembers();
    socket.emit("set-group", room);
};

watchEffect(async () => {
    await getGroups();
});
</script>

<template>
    <div class="min-w-[200px] max-w-[250px] h-full flex-col justify-between">
        <div>
            <!-- logo -->
            <button
                @click="currentChatStore.currentRoom = null"
                class="flex-col gap-1 cursor-pointer"
            >
                <div class="bg-purple-500 w-6 h-2 rounded-xl -ml-1"></div>
                <div class="bg-purple-500 w-6 h-2 rounded-xl"></div>
                <div class="bg-purple-500 w-6 h-2 rounded-xl ml-1"></div>
            </button>

            <button
                class="mt-10 mb-5 border border-purple-400 w-full text-lg rounded-md py-2 bg-purple-950 cursor-pointer"
            >
                Add Chat
            </button>

            <!-- chats -->
            <h1 class="text-3xl font-light">Chats</h1>
            <ul
                class="mt-5 bg-mainHoverDarkBg rounded-xl px-3 divide-y divide-mainBorder"
            >
                <li
                    v-for="group of currentChatStore.groups"
                    @click="setGroup(1)"
                    class="py-3 cursor-pointer flex items-center gap-2 hover:text-purple-500 transition-all"
                >
                    <Icon
                        icon="lets-icons:chat-light"
                        class="text-3xl text-grayDull"
                    />{{ group.name }}
                </li>
            </ul>
        </div>

        <!-- menu context -->
        <ProfileBar @logout="emit('logout')" />
    </div>
</template>
