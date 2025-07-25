<script setup lang="ts">
import { useSocket } from "@/shared/config/useSocketStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";

const sessionStore = useSessionStore();
const { socket } = useSocket();

if (sessionStore.isAuthenticated) {
    socket.connect();
}
</script>

<template>
    <router-view />
</template>
