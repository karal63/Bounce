<script setup lang="ts">
import { useDeleteMessage } from "@/features/delete-message";
import { findMemberById } from "@/shared/lib/helpers/findMemberById";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import type { Context } from "@/shared/types/Context";
import type { MessageWithName } from "@/shared/types/Message";
import { onMounted, ref, watch } from "vue";

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
    const sender = findMemberById(
        currentChatStore.members,
        props.message.senderId
    );
    const receiver = findMemberById(
        currentChatStore.members,
        sessionStore.user?.id
    );

    if (
        sessionStore.user?.id === sender?.userId ||
        receiver?.role === "admin" ||
        receiver?.role === "moderator"
    ) {
        accessabilities.value.delete = true;
    }
});
</script>

<template>
    <ul
        ref="contextRef"
        class="absolute bottom-full flex bg-mainGray border border-mainBorder rounded-md rounded-br-none"
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
