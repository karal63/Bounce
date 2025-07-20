<script setup lang="ts">
const props = defineProps<{
    important: boolean;
}>();
const emit = defineEmits<{
    (e: "unban"): void;
}>();
</script>

<template>
    <button
        @click="emit('unban')"
        class="w-full text-left px-1 py-1 cursor-pointer hover:bg-mainHoverOnGray rounded-md"
        :class="important && 'text-red-500'"
    >
        <slot />
    </button>
</template>
