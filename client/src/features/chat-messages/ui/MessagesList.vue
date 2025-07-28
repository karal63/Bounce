<script setup lang="ts">
import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { MessageWithName } from "@/shared/types/Message";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import SingleMessage from "./SingleMessage.vue";
import { useRouter } from "vue-router";

const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();
const router = useRouter();

const listRef = ref<HTMLElement | null>(null);
const isLoading = ref(false);

const handleNewMessage = (msg: MessageWithName) => {
    const room = currentChatStore.currentRoom;
    if (room.type === "group") {
        currentChatStore.messages = [...currentChatStore.messages, msg];
    } else if (room.type === "direct") {
        if (currentChatStore.currentRoom.id === msg.recipientId) {
            currentChatStore.messages = [...currentChatStore.messages, msg];
        }
    }
    scrollToBottom();
};

const handleDeleteMessage = (messageId: string) => {
    currentChatStore.messages = currentChatStore.messages.filter(
        (msg) => msg.id !== messageId
    );
};

const scrollToBottom = () => {
    nextTick(() => {
        if (listRef.value) {
            listRef.value.scrollTop = listRef.value.scrollHeight;
        }
    });
};

onMounted(() => {
    if (!currentChatStore.currentRoom.id) return router.push("/chat");
    socket.on("newMessage", handleNewMessage);
    socket.on("message-deleted", handleDeleteMessage);
});

onBeforeUnmount(() => {
    socket.off("newMessage", handleNewMessage);
    socket.off("message-deleted", handleDeleteMessage);
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
        }, 100);
    },
    { immediate: true }
);
</script>

<template>
    <div ref="listRef" class="flex justify-center overflow-y-auto h-[82%]">
        <div class="pb-4 max-3xl:w-[60%] max-xl:w-[80%] max-lg:w-full">
            <div
                v-if="currentChatStore.currentRoom.id"
                class="flex-col gap-2 h-full"
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
    </div>
</template>
