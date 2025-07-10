<script setup lang="ts">
const emit = defineEmits<{
    (event: "closeModal"): void;
}>();
</script>

<template>
    <div
        @click.self="emit('closeModal')"
        class="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center transition-opacity"
    >
        <slot />
    </div>
</template>
