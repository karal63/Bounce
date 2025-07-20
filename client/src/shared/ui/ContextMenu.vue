<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";

defineProps<{
    width: string;
    left?: number;
    top?: number;
}>();
const emit = defineEmits<{
    (e: "closeContext"): void;
}>();

const contextRef = ref<HTMLElement | null>(null);

const close = () => {
    emit("closeContext");
};

useClickOutside(contextRef, () => close());
</script>

<template>
    <div
        ref="contextRef"
        class="absolute bg-mainGray p-1 rounded-md border border-mainHoverOnGray flex-col gap-1"
        :style="{
            width: `${width}px`,
            left: `${left}px`,
            top: `calc(${top}px - 50px)`,
        }"
    >
        <slot />
    </div>
</template>
