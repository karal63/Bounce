<script setup lang="ts">
import { useChatStore } from "../../model/chatStore";
const chatStore = useChatStore();

const emit = defineEmits<{
    (event: "logout"): void;
}>();
</script>

<template>
    <div
        v-if="chatStore.isProfileContextOpen"
        class="absolute bottom-[120%] left-0 w-full rounded-md border border-mainBorder bg-mainDarkBg"
    >
        <button
            @click="emit('logout')"
            class="w-full text-left hover:bg-mainHoverDarkBg py-2 px-4 cursor-pointer rounded-md transition-all"
        >
            Logout
        </button>
    </div>
</template>
