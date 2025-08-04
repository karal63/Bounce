<script setup lang="ts">
import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { MessageWithName } from "@/shared/types/Message";
import {
    nextTick,
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
    type Ref,
} from "vue";
import { Icon } from "@iconify/vue";
import SingleMessage from "./SingleMessage.vue";
import { useRouter } from "vue-router";
import { useGetAttachments } from "../model/useGetAttachments";
import type { Attachment } from "@/shared/types/Attachment";
import MessageContext from "./MessageContext.vue";
import type { Context } from "@/shared/types/Context";

const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();
const { getAttachments } = useGetAttachments();

const router = useRouter();

const listRef = ref<HTMLElement | null>(null);
const isLoading = ref(false);
const messageContext = ref<Context>({
    isVisible: true,
    posX: 0,
    posY: 0,
    message: null,
});

const handleNewMessage = ({
    newMessage,
    attachments,
}: {
    newMessage: MessageWithName;
    attachments: Attachment[];
}) => {
    const room = currentChatStore.currentRoom;
    if (room.type === "group") {
        currentChatStore.messages = [...currentChatStore.messages, newMessage];
        currentChatStore.attachments = [
            ...currentChatStore.attachments,
            ...attachments,
        ];
    } else if (room.type === "direct") {
        if (currentChatStore.currentRoom.id === newMessage.recipientId) {
            currentChatStore.messages = [
                ...currentChatStore.messages,
                newMessage,
            ];
            currentChatStore.attachments = [
                ...currentChatStore.attachments,
                ...attachments,
            ];
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

const hideContext = () => {
    messageContext.value.isVisible = false;
};

const showContext = (
    buttonElement: Ref<HTMLElement | null>,
    message: MessageWithName
) => {
    const containerRect = listRef.value?.getBoundingClientRect();
    const buttonRect = buttonElement.value?.getBoundingClientRect();

    if (!containerRect || !buttonRect || !listRef.value) return;

    // Calculate position of button relative to container (scroll container)
    const posY = buttonRect.top - containerRect.top + listRef.value.scrollTop;
    const posX =
        buttonRect.left - containerRect.left + listRef.value.scrollLeft;

    messageContext.value = {
        isVisible: true,
        posY: posY - 45,
        posX: posX - 100,
        message,
    };
};

onMounted(async () => {
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
    async () => {
        isLoading.value = true;
        await getAttachments();
        console.log("getting attachments");
        isLoading.value = false;
        listRef.value?.scroll({
            top: listRef.value.scrollHeight,
        });
    },
    { immediate: true }
);
</script>

<template>
    <div ref="listRef" class="h-[90%] flex justify-center overflow-y-auto">
        <div class="relative pb-4 max-3xl:w-[60%] max-xl:w-[80%] max-lg:w-full">
            <div v-if="currentChatStore.currentRoom.id" class="flex-col gap-2">
                <SingleMessage
                    v-for="message of currentChatStore.messages"
                    :pos="listRef"
                    :message="message"
                    @showContext="showContext"
                />

                <MessageContext
                    v-if="messageContext.isVisible"
                    :messageContext="messageContext"
                    @hideContext="hideContext"
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
