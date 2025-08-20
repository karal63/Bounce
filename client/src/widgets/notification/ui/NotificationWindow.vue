<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from "vue";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { Icon } from "@iconify/vue";
import { useNotificationStore } from "../model/store";
import { useSocket } from "@/shared/config/useSocketStore";
import type { MessageWithName } from "@/shared/types/Message";
import ModalTransition from "@/shared/ui/ModalTransition.vue";
import { measureMemory } from "vm";
import { getGroupById } from "@/shared/lib/helpers/getGroupById";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

const notificationStore = useNotificationStore();
const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();

const getValidMessage = computed(() => {
    return notificationStore.notification.message.length > 30
        ? notificationStore.notification.message.slice(0, 20) + "..."
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
    }
);

const showNotification = (message: MessageWithName) => {
    let name: string | undefined = "";
    if (message.groupId) {
        name = getGroupById(currentChatStore.groups, message.groupId)?.name;
    } else if (message.recipientId) {
        name = message.name;
    }

    notificationStore.notification = {
        isVisible: true,
        senderId: message.senderId,
        name: name ? name : "error: Unknown name",
        senderAvatar: message.avatarUrl,
        message: message.content,
    };
};

onMounted(() => {
    socket.on("mention:show-notification", (message: MessageWithName) =>
        showNotification(message)
    );
});

onUnmounted(() => {
    socket.off("mention:show-notification", (message: MessageWithName) =>
        showNotification(message)
    );
});
</script>

<template>
    <ModalTransition>
        <div
            v-show="notificationStore.notification.isVisible"
            class="absolute bottom-5 right-5 bg-mainGray border border-mainHoverOnGray px-4 py-2 w-[300px] rounded-md"
        >
            <div class="flex">
                <div class="w-[22%]">
                    <UserAvatar
                        alt="sender"
                        :src="notificationStore.notification.senderAvatar"
                        size="45"
                    />
                </div>
                <div class="w-[78%]">
                    <p class="mb-1 font-semibold">
                        {{ notificationStore.notification.name }}
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
