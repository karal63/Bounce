<script setup lang="ts">
import { DeleteGroupModal } from "@/features/delete-group";
import { usePresence } from "@/features/presence";
import { BanReasonModal } from "@/features/show-ban-reason";
import { DefaultChatWindow } from "@/widgets/default-chat-window";
import { CreateOrJoinModal } from "@/widgets/group-modal";
import { MessagedUsersBar } from "@/widgets/messaged-users";
import { NotificationWindow } from "@/widgets/notification";
import { onMounted } from "vue";

onMounted(() => {
    usePresence();
});
</script>

<template>
    <div class="flex w-full h-full">
        <DefaultChatWindow />
        <MessagedUsersBar />

        <CreateOrJoinModal />
        <DeleteGroupModal />
        <BanReasonModal />

        <!-- notification -->
        <NotificationWindow />
    </div>
</template>
