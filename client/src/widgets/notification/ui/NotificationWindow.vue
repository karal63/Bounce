<script setup lang="ts">
import { computed, watch, watchEffect } from "vue";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { Icon } from "@iconify/vue";
import { useNotificationStore } from "../model/store";
import { useSocket } from "@/shared/config/useSocketStore";

const notificationStore = useNotificationStore();
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

socket.on("mention:show-notification", () => {
    console.log("someone mentioned you");
});
</script>

<template>
    <div
        v-if="notificationStore.notification.isVisible"
        class="absolute bottom-5 right-5 bg-mainGray border border-mainHoverOnGray px-4 py-2 w-[300px] rounded-md"
    >
        <div class="flex">
            <div class="w-[22%]">
                <UserAvatar size="45" />
            </div>
            <div class="w-[78%]">
                <p class="mb-1">
                    {{ notificationStore.notification.senderId }}
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
</template>

<style scoped></style>
