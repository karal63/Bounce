<script setup lang="ts">
import { io } from "socket.io-client";
import { ref } from "vue";

const socket = io("http://localhost:5000");
const message = ref("");

socket.on("message", (msg) => {
    message.value = msg;
});
</script>

<template>
    <div>Chat</div>
    <p>Message: {{ message }}</p>
</template>
