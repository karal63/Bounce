<script setup lang="ts">
const modelValue = defineModel<string>();
</script>

<template>
    <textarea
        v-model="modelValue"
        type="text"
        class="w-[320px] h-24 px-3 py-1 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:border-white/10 focus:ring-purple-500 transition resize-none"
    />
</template>
