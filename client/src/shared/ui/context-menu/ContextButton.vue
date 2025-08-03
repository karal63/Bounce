<script setup lang="ts">
defineProps<{
    important: boolean;
}>();
</script>

<template>
    <button
        class="w-full text-left px-1 py-1 cursor-pointer hover:bg-mainHoverOnGray rounded-md"
        :class="important && 'text-red-500'"
    >
        <slot />
    </button>
</template>
