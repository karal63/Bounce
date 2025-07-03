<script setup lang="ts">
import ProfileBar from "@/entities/Chat/ui/Sidebar/ProfileBar.vue";
import { Icon } from "@iconify/vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSocket } from "@/shared/config/useSocketStore";
import { useGetMessages } from "@/entities/Chat/api/getMessages/useGetMessages";
import { useGetMembers } from "../../api/getMembers/useGetMembers";

const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();
const { getMessages } = useGetMessages();
const { getMembers } = useGetMembers();

const emit = defineEmits<{
    (event: "logout"): void;
}>();

const setGroup = async (room: number) => {
    currentChatStore.currentRoom = room;
    currentChatStore.messages = await getMessages();
    currentChatStore.members = await getMembers();
    socket.emit("set-group", room);
};
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

            <!-- chats -->
            <h1 class="text-3xl font-light mt-6">Chats</h1>
            <ul
                class="mt-5 bg-mainHoverDarkBg rounded-xl px-3 divide-y divide-mainBorder"
            >
                <li
                    @click="setGroup(1)"
                    class="py-3 cursor-pointer flex items-center gap-2 hover:text-purple-500 transition-all"
                >
                    <Icon
                        icon="lets-icons:chat-light"
                        class="text-3xl text-grayDull"
                    />Group_2ap
                </li>

                <li
                    @click="setGroup('My group')"
                    class="py-3 cursor-pointer flex items-center gap-2 hover:text-purple-500 transition-all"
                >
                    <Icon
                        icon="lets-icons:chat-light"
                        class="text-3xl text-grayDull"
                    />
                    My group
                </li>
                <li
                    @click="setGroup('Official Karal63`s group')"
                    class="py-3 cursor-pointer flex items-center gap-2 hover:text-purple-500 transition-all"
                >
                    <Icon
                        icon="lets-icons:chat-light"
                        class="text-3xl text-grayDull"
                    />Official Karal63's group
                </li>
            </ul>
        </div>

        <!-- menu context -->
        <ProfileBar @logout="emit('logout')" />
    </div>
</template>
