<script setup lang="ts">
import { ref, watch } from "vue";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import type { ContextGroup } from "../model/types";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useDeleteGroupStore } from "@/features/delete-group";
import { useLeaveGroup } from "@/features/leave-group";

const sessionStore = useSessionStore();
const deleteGroupStore = useDeleteGroupStore();
const { leaveGroup } = useLeaveGroup();

const props = defineProps<{
    context: ContextGroup;
}>();

const emit = defineEmits<{
    (event: "closeContext"): void;
    (event: "openDeleteModal"): void;
}>();

const contextRef = ref<HTMLElement | null>(null);
const permissions = ref({
    canDelete: false,
    canLeave: false,
});

const handleDelete = () => {
    emit("openDeleteModal");
    emit("closeContext");
};

const handleLeave = async () => {
    emit("closeContext");
    if (!deleteGroupStore.contextGroup?.id) return;
    await leaveGroup(deleteGroupStore.contextGroup?.id);
};

useClickOutside(contextRef, () => {
    emit("closeContext");
});

watch(
    () => deleteGroupStore.contextGroup,
    () => {
        if (sessionStore.user?.id === deleteGroupStore.contextGroup?.ownerId) {
            permissions.value.canDelete = true;
        } else {
            permissions.value.canDelete = false;
        }
    }
);
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
            v-if="permissions.canDelete"
            @click="handleDelete"
            class="text-red-500 w-full text-center py-1 cursor-pointer bg-mainDarkBg hover:bg-mainHoverDarkBg"
        >
            Delete
        </button>
        <button
            v-else
            @click="handleLeave"
            class="text-red-500 w-full text-center py-1 cursor-pointer bg-mainDarkBg hover:bg-mainHoverDarkBg"
        >
            Leave
        </button>
    </div>
</template>
