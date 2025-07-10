<script setup lang="ts">
import type { ContextGroup } from "../model/types";

defineProps<{
    context: ContextGroup;
}>();

const emit = defineEmits<{
    (event: "closeContext"): void;
    (event: "openDeleteModal"): void;
}>();

const deleteGroup = () => {
    emit("openDeleteModal");
    emit("closeContext");
};
// you cant import feature in feature so do smth with deleteGroupStore
// add ui for confirm window of deleting group
// connect to server
// think about leaving group, not deleting (depends of user role in this group)
</script>

<template>
    <div
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
