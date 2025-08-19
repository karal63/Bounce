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
import { useGetReactions } from "../model/useGetReactions";
import { ReactionsContext, useReaction } from "@/features/reaction";
import type { ReactionContext } from "../../reaction/model/types";
import type { Reaction } from "@/shared/types/Reaction";

const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();
const { getAttachments } = useGetAttachments();
const { getReactions } = useGetReactions();
const { getAllReactions } = useReaction();

const router = useRouter();

const listRef = ref<HTMLElement | null>(null);
const isLoading = ref(false);
const messageContext = ref<Context>({
    isVisible: true,
    posX: 0,
    posY: 0,
    message: null,
});
const reactionPanelContext = ref<ReactionContext>({
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
    if (room.type === "group" && newMessage.groupId === room.id) {
        currentChatStore.messages = [...currentChatStore.messages, newMessage];
        currentChatStore.attachments = [
            ...currentChatStore.attachments,
            ...attachments,
        ];
    } else if (room.type === "direct") {
        if (
            currentChatStore.currentRoom.id === newMessage.recipientId ||
            currentChatStore.currentRoom.id === newMessage.senderId
        ) {
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

const handleNewReaction = (reaction: Reaction) => {
    const index = currentChatStore.reactions.findIndex(
        (r) =>
            r.messageId === reaction.messageId &&
            r.stickerId === reaction.stickerId
    );

    if (index !== -1) {
        currentChatStore.reactions = currentChatStore.reactions.map((r, i) => {
            if (i === index) {
                if (!r.count) return r;
                return {
                    ...r,
                    count: r.count + 1,
                };
            }
            return r;
        });
        currentChatStore.allReactions.push(reaction);
    } else {
        // Add as new reaction

        currentChatStore.reactions = [
            ...currentChatStore.reactions,
            {
                ...reaction,
                count: 1,
            },
        ];
        currentChatStore.allReactions.push(reaction);
    }
};

const handleDeleteReaction = (reaction: Reaction) => {
    currentChatStore.reactions = currentChatStore.reactions.reduce(
        (acc: Reaction[], r) => {
            if (
                r.messageId === reaction.messageId &&
                r.stickerId === reaction.stickerId
            ) {
                if (r.count && r.count > 1) {
                    acc.push({
                        ...r,
                        count: r.count - 1,
                    });
                }
            } else {
                acc.push(r);
            }
            return acc;
        },
        []
    );
    currentChatStore.allReactions = currentChatStore.allReactions.filter(
        (r) => r.id !== reaction.id
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
    targetElement: Ref<HTMLElement | null>,
    message: MessageWithName,
    type: "reactions" | "context"
) => {
    const containerRect = listRef.value?.getBoundingClientRect();
    const buttonRect = targetElement.value?.getBoundingClientRect();

    if (!containerRect || !buttonRect || !listRef.value) return;

    // Calculate position of button relative to container (scroll container)
    const posY = buttonRect.top - containerRect.top + listRef.value.scrollTop;
    const posX =
        buttonRect.left - containerRect.left + listRef.value.scrollLeft;

    if (type === "context") {
        messageContext.value = {
            isVisible: true,
            posY: posY - 45,
            posX: posX,
            message,
        };
    } else if (type === "reactions") {
        reactionPanelContext.value = {
            isVisible: true,
            posY: posY - 50,
            posX: posX,
            message,
        };
    }
};

onMounted(async () => {
    if (!currentChatStore.currentRoom.id) return router.push("/chat");
    socket.on("newMessage", handleNewMessage);
    socket.on("message-deleted", handleDeleteMessage);
    socket.on("reactionAdded", handleNewReaction);
    socket.on("reactionRemoved", handleDeleteReaction);
});

onBeforeUnmount(() => {
    socket.off("newMessage", handleNewMessage);
    socket.off("message-deleted", handleDeleteMessage);
    socket.off("reactionAdded", handleNewReaction);
    socket.off("reactionRemoved", handleDeleteReaction);
});

watch(
    () => currentChatStore.currentRoom.id,
    async () => {
        isLoading.value = true;
        await getAttachments();
        await getReactions();
        await getAllReactions();

        console.log("getting attachments");
        isLoading.value = false;

        if (listRef.value?.scroll) {
            listRef.value?.scroll({
                top: listRef.value.scrollHeight,
            });
        }
    },
    { immediate: true }
);
</script>

<template>
    <div
        ref="listRef"
        class="relative h-[90%] mb-2 flex justify-center overflow-y-auto"
    >
        <div class="pb-4 max-3xl:w-[60%] max-xl:w-[80%] max-lg:w-full">
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

                <ReactionsContext
                    :reactionPanelContext="reactionPanelContext"
                    @closeReactions="reactionPanelContext.isVisible = false"
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
