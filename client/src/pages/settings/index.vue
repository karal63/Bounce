<script setup lang="ts">
import ChatTopBar from "@/widgets/chat-top-bar/ui/ChatTopBar.vue";
import { NotificationWindow } from "@/widgets/notification";
import { SettingsList } from "@/widgets/settings-list";
</script>

<template>
    <ChatTopBar />
    <div class="flex justify-center">
        <SettingsList />
    </div>
    <NotificationWindow />
</template>
