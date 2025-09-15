<script setup lang="ts">
import { onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import ProfileBar from "./ui/ProfileBar.vue";

import { useGetGroups } from "@/features/chat-groups";
import { useModalStore } from "@/features/create-or-join";
import { GroupsList } from "@/features/chat-groups";
import { useDeleteGroupStore } from "@/features/delete-group";
import { useSocket } from "@/shared/config/useSocketStore";

const currentChatStore = useCurrentChatStore();
const deleteGroupStore = useDeleteGroupStore();

const { getGroups } = useGetGroups();
const modal = useModalStore();
const { socket } = useSocket();

const clearRoom = () => {
    socket.emit("leave-group", currentChatStore.currentRoom.id);
    currentChatStore.currentRoom = {
        id: null,
        type: null,
    };
};

onMounted(async () => {
    await getGroups();
});
</script>

<template>
    <div class="min-w-[225px] max-w-[250px] h-full flex-col justify-between">
        <div>
            <!-- logo -->
            <RouterLink
                to="/chat"
                @click="clearRoom"
                class="flex items-center gap-2 cursor-pointer"
            >
                <div class="flex-col gap-1">
                    <div class="bg-purple-500 w-6 h-1 rounded-xl -ml-1"></div>
                    <div class="bg-purple-500 w-6 h-1 rounded-xl"></div>
                    <div class="bg-purple-500 w-6 h-1 rounded-xl ml-1"></div>
                </div>
                <h3 class="text-2xl text-start font-bold">Bounce</h3>
            </RouterLink>

            <h1 class="text-xl font-light mt-10 mb-2 text-grayDull">Chats</h1>

            <div class="relative">
                <div
                    class="absolute -inset-[3px] bg-gradient-to-tr from-purple-500 to-purple-800 rounded-lg z-0"
                ></div>

                <div
                    class="absolute -inset-[1px] bg-gradient-to-tr from-purple-500 to-pink-800 blur-sm rounded-lg z-0"
                ></div>

                <button
                    @click="modal.isModalOpen = true"
                    class="relative w-full z-10 bg-gradient-to-tr from-purple-900 to-purple-500 border-3 border-mainHoverDarkBg rounded-lg h-11 px-3 cursor-pointer gap-2 transition-all flex justify-between items-center"
                >
                    New Chat
                    <Icon icon="iconoir:plus" class="text-3xl" />
                </button>
            </div>

            <GroupsList
                @openDeleteModal="deleteGroupStore.isDeleteModalOpen = true"
                @setContextGroup="deleteGroupStore.contextGroup = $event"
            />
        </div>

        <!-- menu context -->
        <ProfileBar />
    </div>
</template>
