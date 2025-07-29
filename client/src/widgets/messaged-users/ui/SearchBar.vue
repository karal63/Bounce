<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineEmits<{
    (e: "filter", userInput: string): void;
}>();
</script>

<template>
    <div class="relative">
        <input
            type="text"
            @input="(e) => $emit('filter', (e.target as HTMLInputElement).value)"
            class="w-full py-2 pl-3 pr-10 rounded-md border border-mainBorder focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <Icon
            icon="ic:twotone-search"
            class="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl"
        />
    </div>
</template>
