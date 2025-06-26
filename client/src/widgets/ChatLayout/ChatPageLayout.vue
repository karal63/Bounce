<script setup lang="ts">
import ChatPage from "@/entities/Chat/ui/Sidebar/index.vue";
import { useLogout } from "@/features/auth/logout/useLogout";
const { logout } = useLogout();
</script>

<template>
    <ChatPage @logout="logout" />
</template>
