<script setup lang="ts">
import type { Context } from "@/shared/types/Context";

defineProps<{
    context: Context;
}>();
</script>

<template>
    <div
        v-if="context.isVisible"
        class="absolute bg-purple-500"
        :style="{
            left: `${context.posX}px`,
            top: `${context.posY}px`,
        }"
    >
        123
    </div>
</template>
