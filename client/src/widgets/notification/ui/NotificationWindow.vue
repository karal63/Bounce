<script setup lang="ts">
import { computed, watch } from "vue";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { Icon } from "@iconify/vue";
import { useNotificationStore } from "../model/store";
import { useSocket } from "@/shared/config/useSocketStore";
import type { ReadyMessage } from "@/shared/types/Message";
import { findMemberById } from "@/shared/lib/helpers/findMemberById";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import ModalTransition from "@/shared/ui/ModalTransition.vue";

const notificationStore = useNotificationStore();
const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();

const getValidMessage = computed(() => {
    return notificationStore.notification.message.length > 40
        ? notificationStore.notification.message.slice(0, 40) + "..."
        : notificationStore.notification.message;
});

watch(
    () => notificationStore.notification.isVisible,
    () => {
        if (notificationStore.notification.isVisible) {
            setTimeout(() => {
                notificationStore.notification.isVisible = false;
            }, 5000);
        }
    },
    { immediate: true }
);

socket.on("mention:show-notification", (message: ReadyMessage) => {
    notificationStore.notification = {
        isVisible: true,
        senderId: message.senderId,
        message: message.content,
    };
});

// create actual mention functionality
</script>

<template>
    <ModalTransition>
        <div
            v-show="notificationStore.notification.isVisible"
            class="absolute bottom-5 right-5 bg-mainGray border border-mainHoverOnGray px-4 py-2 w-[300px] rounded-md"
        >
            <div class="flex">
                <div class="w-[22%]">
                    <UserAvatar size="45" />
                </div>
                <div class="w-[78%]">
                    <p class="mb-1">
                        {{
                            findMemberById(
                                currentChatStore.members,
                                notificationStore.notification.senderId
                            )?.name
                        }}
                    </p>
                    <p class="text-sm">{{ getValidMessage }}</p>
                </div>

                <button
                    @click="notificationStore.notification.isVisible = false"
                    class="absolute top-1 right-1 w-7 h-7 flex-center cursor-pointer hover:bg-mainHoverOnGray transition-all rounded-full"
                >
                    <Icon icon="gg:close" />
                </button>
            </div>
        </div>
    </ModalTransition>
</template>

<style scoped></style>
