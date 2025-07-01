<script setup lang="ts">
import type { ReadyMessage } from "@/features/Chat/sendMessege/model/types/Message";
import { useSocket } from "@/shared/config/useSocketStore";
import { ref, watchEffect } from "vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { Icon } from "@iconify/vue";
import { useChatStore } from "@/entities/Chat/model/chatStore";
import { checkPerson } from "@/entities/Chat/lib/checkPerson";

const currentChatStore = useCurrentChatStore();
const chatStore = useChatStore();
const { socket } = useSocket();

// const messages = ref<ReadyMessage[]>([
//     {
//         groupId: "Group_2ap",
//         senderId: "1111",
//         content: "Hello!",
//     },
//     {
//         groupId: "Group_2ap",
//         senderId: "1111",
//         content: "Nice!",
//     },
//     {
//         groupId: "Group_2ap",
//         senderId: "test",
//         content: "WoW!",
//     },
// ]);
const members = ref();
const isMembersDropdown = ref(false);

watchEffect(() => {
    // must be an api call in api folder
    chatStore.getMembersList();
});

socket.on("message", (msg) => {
    currentChatStore.messages = [...currentChatStore.messages, msg];
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
            v-if="currentChatStore.currentRoom"
            v-for="message of currentChatStore.messages"
            class="flex"
            :class="checkPerson(message) ? 'justify-end' : 'justify-start'"
        >
            <div
                class="flex items-center gap-3"
                :class="checkPerson(message) && 'flex-row-reverse'"
            >
                <div
                    v-if="message.senderId"
                    class="w-8 h-8 bg-purple-700 flex-center rounded-full"
                >
                    {{ message.senderId[0] }}
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

        <div v-else class="flex-center flex-col mt-20">
            <div class="flex items-center gap-3">
                <div class="flex-col gap-1">
                    <div class="bg-purple-900 w-6 h-2 rounded-xl -ml-1"></div>
                    <div class="bg-purple-900 w-6 h-2 rounded-xl"></div>
                    <div class="bg-purple-900 w-6 h-2 rounded-xl ml-1"></div>
                </div>
                <h1 class="text-3xl font-bold text-purple-900">Bounce</h1>
            </div>
            <p class="w-[300px] text-grayDull text-center mt-2 leading-5">
                Share moments, chat with friends, and stay connected. Simple,
                fun, and social.
            </p>

            <div class="mt-24 text-grayDull text-lg">
                Start chatting by joining a
                <span class="bg-purple-900/40 px-2 rounded-md font-semibold"
                    >group</span
                >
                from the
                <span class="bg-purple-900/40 px-2 rounded-md font-semibold"
                    >Sidebar</span
                >.
            </div>
        </div>
    </div>
</template>
