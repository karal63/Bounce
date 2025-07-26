<script setup lang="ts">
import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { MessageWithName } from "@/shared/types/Message";
import { onMounted, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import SingleMessage from "./SingleMessage.vue";
import { useRouter } from "vue-router";

const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();
const router = useRouter();

const listRef = ref<HTMLElement | null>(null);
const isLoading = ref(false);

socket.on("newMessage", (msg: MessageWithName) => {
    currentChatStore.messages = [...currentChatStore.messages, msg];
});

socket.on("message-deleted", (messageId: string) => {
    currentChatStore.messages = currentChatStore.messages.filter(
        (msg) => msg.id !== messageId
    );
});

watch(
    () => currentChatStore.currentRoom.id,
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

onMounted(() => {
    if (!currentChatStore.currentRoom.id) router.push("/chat");
});
</script>

<template>
    <div ref="listRef" class="pt-10 pr-4 max-h-[91%] overflow-y-auto">
        <div
            v-if="currentChatStore.currentRoom.id"
            class="flex-col gap-4 h-full"
        >
            <SingleMessage
                :posLeft="listRef?.getBoundingClientRect().left"
                v-for="message of currentChatStore.messages"
                :message="message"
            />
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
