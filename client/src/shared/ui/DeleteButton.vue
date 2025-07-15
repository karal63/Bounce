<script setup lang="ts">
defineProps<{
    text: string;
}>();
const emit = defineEmits<{
    (e: "callback"): void;
}>();
</script>

<template>
    <button
        @click="emit('callback')"
        class="bg-red-600 hover:bg-red-800 px-3 py-1 rounded-md cursor-pointer transition-all"
    >
        {{ text }}
    </button>
</template>
