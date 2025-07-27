<script setup lang="ts">
import { onMounted } from "vue";
import { Icon } from "@iconify/vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import ProfileBar from "./ui/ProfileBar.vue";

import { useGetGroups } from "@/features/chat-groups";
import { useModalStore } from "@/features/create-or-join";
import { useLogout } from "@/features/auth/logout";
import { GroupsList } from "@/features/chat-groups";
import { useDeleteGroupStore } from "@/features/delete-group";
import { useSocket } from "@/shared/config/useSocketStore";

const currentChatStore = useCurrentChatStore();
const deleteGroupStore = useDeleteGroupStore();

const { getGroups } = useGetGroups();
const modal = useModalStore();
const { logout } = useLogout();
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
    <div class="min-w-[200px] max-w-[250px] h-full flex-col justify-between">
        <div>
            <!-- logo -->
            <RouterLink
                to="/chat"
                @click="clearRoom"
                class="flex-col gap-1 cursor-pointer"
            >
                <div class="bg-purple-500 w-6 h-2 rounded-xl -ml-1"></div>
                <div class="bg-purple-500 w-6 h-2 rounded-xl"></div>
                <div class="bg-purple-500 w-6 h-2 rounded-xl ml-1"></div>
            </RouterLink>

            <h1 class="text-xl font-light mt-10 mb-2 text-grayDull">Chats</h1>

            <button
                @click="modal.isModalOpen = true"
                class="w-full bg-mainHoverDarkBg border border-mainBorder py-3 px-3 rounded-xl cursor-pointer gap-2 transition-all flex justify-between items-center"
            >
                Add Chat
                <Icon icon="iconoir:plus" class="text-purple-400 text-2xl" />
            </button>

            <GroupsList
                @openDeleteModal="deleteGroupStore.isDeleteModalOpen = true"
                @setContextGroup="deleteGroupStore.contextGroup = $event"
            />
        </div>

        <!-- menu context -->
        <ProfileBar @logout="logout" />
    </div>
</template>
