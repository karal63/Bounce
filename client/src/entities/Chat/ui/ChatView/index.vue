<script setup lang="ts">
import { useSocket } from "@/shared/config/useSocketStore";
import { ref } from "vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { Icon } from "@iconify/vue";
import { checkPerson } from "@/features/COPYME/lib/checkPerson";
import MembersDropdown from "@/entities/Chat/ui/ChatView/MembersDropdown.vue";
import type { MessageWithName } from "@/features/Chat/sendMessege/model/types/Message";

const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();

const isMembersDropdown = ref(false);

socket.on("newMessage", (msg: MessageWithName) => {
    currentChatStore.messages = [...currentChatStore.messages, msg];
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
            <MembersDropdown :isMembersDropdown="isMembersDropdown" />
        </div>
    </div>

    <div class="flex-col gap-4 pt-10 pr-4 overflow-y-scroll max-h-[84%]">
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
                    {{ message.name[0] }}
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
