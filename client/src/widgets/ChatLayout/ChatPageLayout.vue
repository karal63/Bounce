<script setup lang="ts">
import ChatPage from "@/entities/chat/ui/Sidebar/index.vue";
import ChatView from "@/entities/chat/ui/ChatView/index.vue";
import SendMessagePanel from "@/features/Chat/sendMessege/ui/index.vue";
import { useLogout } from "@/features/auth/logout/useLogout";
import { CreateOrJoinModal } from "@/features/Chat";
const { logout } = useLogout();
</script>

<template>
    <div class="flex h-full">
        <ChatPage @logout="logout" />
        <div class="relative w-full ml-10">
            <ChatView />
            <SendMessagePanel />
        </div>
        <CreateOrJoinModal />
    </div>
</template>
