<script setup lang="ts">
import type { Context } from "@/shared/types/Context";
import type { MessagedUser } from "@/shared/types/MessagedUser";
import ContextButton from "@/shared/ui/context-menu/ContextButton.vue";
import ContextMenu from "@/shared/ui/context-menu/ContextMenu.vue";
import { useDeleteMessagedUser } from "../model/useDeleteMessagedUser";

const { deleteMessagedUser } = useDeleteMessagedUser();

const props = defineProps<{
    userContext: Context<MessagedUser>;
}>();
const emit = defineEmits<{
    (e: "closeContext"): void;
}>();

const deleteUser = () => {
    if (!props.userContext.user) return;
    emit("closeContext");
    deleteMessagedUser(props.userContext.user?.id);
};
</script>

<template>
    <ContextMenu
        v-if="userContext.isVisible"
        width="100"
        :left="userContext.posX"
        :top="userContext.posY"
        @close-context="$emit('closeContext')"
    >
        <ContextButton :important="true" @click="deleteUser">
            Delete
        </ContextButton>
    </ContextMenu>
</template>
