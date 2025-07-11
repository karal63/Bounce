<script setup lang="ts">
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import type { ContextGroup } from "../model/types";
import { ref } from "vue";

defineProps<{
    context: ContextGroup;
}>();

const emit = defineEmits<{
    (event: "closeContext"): void;
    (event: "openDeleteModal"): void;
}>();

const contextRef = ref<HTMLElement | null>(null);

const deleteGroup = () => {
    emit("openDeleteModal");
    emit("closeContext");
};

useClickOutside(contextRef, () => {
    emit("closeContext");
});
</script>

<template>
    <div
        ref="contextRef"
        v-if="context.isVisible"
        class="absolute w-30 bg-mainDarkBg border border-mainHoverOnGray rounded-md py-1"
        :style="{ top: `${context.posY}px`, left: `${context.posX}px` }"
    >
        <button
            class="w-full text-center py-1 cursor-pointer bg-mainDarkBg hover:bg-mainHoverDarkBg"
        >
            Info
        </button>
        <button
            @click="deleteGroup"
            class="text-red-500 w-full text-center py-1 cursor-pointer bg-mainDarkBg hover:bg-mainHoverDarkBg"
        >
            Delete
        </button>
    </div>
</template>
