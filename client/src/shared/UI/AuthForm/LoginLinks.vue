<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
    <div class="flex gap-2">
        <a
            href="#"
            class="h-10 w-10 border border-purple-600 rounded-md flex-center text-2xl hover:bg-gray-800"
        >
            <Icon icon="mdi:google"
        /></a>
        <a
            href="#"
            class="h-10 w-10 border border-purple-600 rounded-md flex-center text-2xl hover:bg-gray-800"
        >
            <Icon icon="ic:baseline-apple"
        /></a>
        <a
            href="#"
            class="h-10 w-10 border border-purple-600 rounded-md flex-center text-2xl hover:bg-gray-800"
        >
            <Icon icon="ic:baseline-facebook"
        /></a>
        <a
            href="#"
            class="h-10 w-10 border border-purple-600 rounded-md flex-center text-2xl hover:bg-gray-800"
        >
            <Icon icon="mdi:github" />
        </a>
    </div>
</template>
