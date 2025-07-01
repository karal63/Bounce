<script setup lang="ts">
import type { ReadyMessage } from "@/features/Chat/sendMessege/model/types/Message";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useSocket } from "@/shared/config/useSocketStore";
import { ref, watchEffect } from "vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { Icon } from "@iconify/vue";

const sessionStore = useSessionStore();
const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();

const messages = ref<ReadyMessage[]>([
    {
        sender: "1111",
        content: "Hello!",
        sentAt: new Date(),
    },
    {
        sender: "1111",
        content: "Nice!",
        sentAt: new Date(),
    },
    {
        sender: "test",
        content: "WoW!",
        sentAt: new Date(),
    },
]);
const members = ref();
const isMembersDropdown = ref(false);

const checkPerson = (message: ReadyMessage) => {
    return sessionStore.user?.name === message.sender;
};

const getMembersList = () => {
    socket.emit("get-members-list", {
        room: currentChatStore.currentRoom,
        socketId: socket.id,
    });
};

watchEffect(() => {
    getMembersList();
});

socket.on("message", (msg) => {
    messages.value = [...messages.value, msg];
});
socket.on("members-list", (activeMembers) => {
    console.log(activeMembers);
    members.value = activeMembers;
});
</script>

<template>
    <div
        class="bg-mainHoverDarkBg px-4 py-2 rounded-md flex justify-between items-center"
    >
        <h1 class="text-2xl">{{ currentChatStore.currentRoom }}</h1>
        <div class="relative">
            <button
                @click="isMembersDropdown = !isMembersDropdown"
                class="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded-md cursor-pointer"
            >
                <Icon icon="fluent:person-32-filled" class="text-3xl" />Members
                <Icon
                    icon="iconamoon:arrow-up-2-thin"
                    class="text-3xl transform transition-all duration-300"
                    :class="isMembersDropdown ? 'rotate-180' : ''"
                />
            </button>

            <!-- dropdown -->
            <div
                class="absolute bg-purple-400 w-full top-full rounded-md transition-all overflow-hidden"
                :class="isMembersDropdown ? 'h-full' : 'h-0'"
            >
                123
            </div>
        </div>
    </div>

    <div class="flex-col gap-4 mt-10">
        <div
            v-for="message of messages"
            class="flex"
            :class="checkPerson(message) ? 'justify-end' : 'justify-start'"
        >
            <div
                class="flex items-center gap-3"
                :class="checkPerson(message) && 'flex-row-reverse'"
            >
                <div
                    v-if="message.sender"
                    class="w-8 h-8 bg-purple-700 flex-center rounded-full"
                >
                    {{ message.sender[0] }}
                </div>
                <div
                    class="max-w-max px-3 py-2 rounded-2xl"
                    :class="
                        checkPerson(message)
                            ? 'bg-purple-500 rounded-br-none'
                            : 'bg-white/20 rounded-bl-none'
                    "
                >
                    {{ message.content }}
                </div>
            </div>
        </div>
    </div>
</template>
