<script setup lang="ts">
import { useDeleteMessage } from "@/features/delete-message";
import { findMemberById } from "@/shared/lib/helpers/findMemberById";
import { hasPermissions } from "@/shared/lib/helpers/hasPermissions";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import type { Context } from "@/shared/types/Context";
import { onMounted, ref } from "vue";

const { deleteMessage } = useDeleteMessage();
const currentChatStore = useCurrentChatStore();
const sessionStore = useSessionStore();

const emit = defineEmits<{
    (event: "hideContext"): void;
}>();
const props = defineProps<{
    messageContext: Context;
}>();
const contextRef = ref<HTMLElement | null>(null);
const accessabilities = ref({
    delete: false,
    edit: false,
});

useClickOutside(contextRef, () => emit("hideContext"));

const handleDelete = async () => {
    if (!props.messageContext.message?.id) return;
    await deleteMessage(props.messageContext.message?.id);
    emit("hideContext");
};

onMounted(() => {
    if (!props.messageContext.message?.senderId || !sessionStore.user?.id)
        return;

    if (currentChatStore.currentRoom.type === "group") {
        const message = props.messageContext.message;

        const receiver = findMemberById(
            currentChatStore.members,
            sessionStore.user?.id
        );

        if (
            sessionStore.user?.id === message.senderId ||
            hasPermissions(receiver)
        ) {
            accessabilities.value.delete = true;
        }
    } else if (currentChatStore.currentRoom.type === "direct") {
        const message = props.messageContext.message;
        if (sessionStore.user?.id === message.senderId) {
            accessabilities.value.delete = true;
        }
    }
});
</script>

<template>
    <ul
        ref="contextRef"
        class="absolute flex bg-mainGray border border-mainBorder rounded-md"
        :style="{
            left: `${messageContext.posX}px`,
            top: `${messageContext.posY}px`,
        }"
    >
        <li>
            <button
                v-if="accessabilities.delete"
                @click="handleDelete"
                class="text-red-500 cursor-pointer px-4 py-1"
            >
                Delete
            </button>
        </li>
        <li>
            <button class="cursor-pointer px-4 py-1">Mocked</button>
        </li>
    </ul>
</template>
