<script setup lang="ts">
import { onMounted } from "vue";
import { Icon } from "@iconify/vue";
import ProfileBar from "@/widgets/sidebar/ui/ProfileBar.vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSocket } from "@/shared/config/useSocketStore";
import { useGetMessages } from "@/features/chat-messages/model/useGetMessages";
import { useGetMembers } from "@/features/chat-members/model/useGetMembers";
import { useGetGroups } from "@/features/chat-groups/model/useGetGroups";
import { useModalStore } from "@/features/create-or-join/model/modal.store";
import { useLogout } from "@/features/auth/logout/useLogout";

const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();
const { getMessages } = useGetMessages();
const { getMembers } = useGetMembers();
const { getGroups } = useGetGroups();
const modal = useModalStore();
const { logout } = useLogout();

const setGroup = async (room: number) => {
    socket.emit("set-group", {
        prevRoom: currentChatStore.currentRoom,
        newRoom: room,
    });
    currentChatStore.currentRoom = room;
    currentChatStore.messages = await getMessages();
    currentChatStore.members = await getMembers();
};

onMounted(async () => {
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

            <h1 class="text-xl font-light mt-10 mb-2 text-grayDull">Chats</h1>

            <button
                @click="modal.isModalOpen = true"
                class="w-full bg-mainHoverDarkBg border border-mainBorder py-3 px-3 rounded-xl cursor-pointer gap-2 transition-all flex justify-between items-center"
            >
                Add Chat
                <Icon icon="iconoir:plus" class="text-purple-400 text-2xl" />
            </button>

            <ul
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
        </div>

        <!-- menu context -->
        <ProfileBar @logout="logout" />
    </div>
</template>
