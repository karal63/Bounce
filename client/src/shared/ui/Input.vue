<script setup lang="ts">
const modelValue = defineModel<string>();
defineProps<{
    x: string;
    y: string;
}>();
</script>

<template>
    <input
        v-model="modelValue"
        type="text"
        class="px-3 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:border-white/10 focus:ring-purple-500 transition resize-none"
        :style="{ width: `${x}px`, height: `${y}px` }"
    />
</template>
