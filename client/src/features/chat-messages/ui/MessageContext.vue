<script setup lang="ts">
import { useDeleteMessage } from "@/features/delete-message";
import { findMemberById } from "@/shared/lib/helpers/findMemberById";
import { hasPermissions } from "@/shared/lib/helpers/hasPermissions";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import type { Context } from "@/shared/types/Context";
import type { MessageWithName } from "@/shared/types/Message";
import { onMounted, ref } from "vue";

const { deleteMessage } = useDeleteMessage();
const currentChatStore = useCurrentChatStore();
const sessionStore = useSessionStore();

const emit = defineEmits<{
    (event: "hideContext"): void;
}>();
const props = defineProps<{
    message: MessageWithName;
    messageContext: Context;
}>();
const contextRef = ref<HTMLElement | null>(null);
const accessabilities = ref({
    delete: false,
    edit: false,
});

useClickOutside(contextRef, () => emit("hideContext"));

const handleDelete = async () => {
    await deleteMessage(props.message.id);
    emit("hideContext");
};

onMounted(() => {
    if (!props.message.senderId || !sessionStore.user?.id) return;

    if (currentChatStore.currentRoom.type === "group") {
        const message = props.message;

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
        const message = props.message;
        if (sessionStore.user?.id === message.senderId) {
            accessabilities.value.delete = true;
        }
    }
});
</script>

<template>
    <ul
        ref="contextRef"
        class="absolute bottom-[110%] flex bg-mainGray border border-mainBorder rounded-md"
        :style="{ left: `${messageContext.posX}px` }"
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
