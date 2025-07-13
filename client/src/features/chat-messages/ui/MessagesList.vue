<script setup lang="ts">
import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { MessageWithName } from "@/shared/types/Message";
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import SingleMessage from "./SingleMessage.vue";

const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();
const listRef = ref<HTMLElement | null>(null);
const isLoading = ref(false);

socket.on("newMessage", (msg: MessageWithName) => {
    currentChatStore.messages = [...currentChatStore.messages, msg];
});

watch(
    () => currentChatStore.currentRoom,
    () => {
        isLoading.value = true;
        setTimeout(() => {
            listRef.value?.scroll({
                top: listRef.value.scrollHeight,
            });
            isLoading.value = false;
        }, 20);
    }
);
</script>

<template>
    <div ref="listRef" class="pt-10 pr-4 max-h-[91%] overflow-y-auto">
        <div v-if="currentChatStore.currentRoom" class="flex-col gap-4 h-full">
            <SingleMessage
                v-for="message of currentChatStore.messages"
                :message="message"
            />
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

        <!-- loading -->
        <div
            v-if="isLoading"
            class="absolute top-0 left-0 w-full h-[91%] flex-center bg-mainDarkBg"
        >
            <Icon icon="line-md:loading-loop" class="text-4xl" />
        </div>
    </div>
</template>
