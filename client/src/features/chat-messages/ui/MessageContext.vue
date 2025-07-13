<script setup lang="ts">
import { useDeleteMessage } from "@/features/delete-message";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import type { Context } from "@/shared/types/Context";
import type { MessageWithName } from "@/shared/types/Message";
import { ref } from "vue";

const { deleteMessage } = useDeleteMessage();

const emit = defineEmits<{
    (event: "hideContext"): void;
}>();
const props = defineProps<{
    message: MessageWithName;
    messageContext: Context;
}>();
const contextRef = ref<HTMLElement | null>(null);

useClickOutside(contextRef, () => emit("hideContext"));

const handleDelete = async () => {
    await deleteMessage(props.message.id);
    emit("hideContext");
};
</script>

<!-- top-0 breaks button look -->
<!-- make this part work or even change everything -->

<template>
    <ul
        ref="contextRef"
        class="absolute bottom-full bg-mainGray border border-mainBorder rounded-md rounded-br-none"
        :style="{ left: `${messageContext.posX}px` }"
    >
        <li>
            <button
                @click="handleDelete"
                class="text-red-500 cursor-pointer px-4 py-1"
            >
                Delete
            </button>
        </li>
    </ul>
</template>
