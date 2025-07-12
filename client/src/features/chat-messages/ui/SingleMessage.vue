<script setup lang="ts">
import type { MessageWithName } from "@/shared/types/Message";
import { checkPerson } from "../lib/checkPerson";
import { ref } from "vue";
import { useHover } from "@/shared/lib/hooks/useHover";
import { Icon } from "@iconify/vue";

defineProps<{
    message: MessageWithName;
}>();

const messageRef = ref<HTMLElement | null>(null);
const isHovering = ref(false);

useHover(
    messageRef,
    () => (isHovering.value = true),
    () => (isHovering.value = false)
);
</script>

<template>
    <div
        class="flex"
        :class="checkPerson(message) ? 'justify-end' : 'justify-start'"
    >
        <div
            ref="messageRef"
            class="flex items-center gap-3"
            :class="checkPerson(message) && 'flex-row-reverse'"
        >
            <div
                v-if="message.senderId"
                class="w-8 h-8 bg-purple-700 flex-center rounded-full"
            >
                {{ message.name[0] }}
            </div>
            <div
                class="max-w-max px-3 py-2 rounded-2xl"
                :class="
                    checkPerson(message)
                        ? 'bg-purple-500 rounded-br-none'
                        : 'bg-white/20 rounded-bl-none'
                "
            >
                {{ message.content }}
            </div>

            <button
                v-if="isHovering"
                class="w-8 h-8 rounded-full flex-center bg-mainHoverDarkBg cursor-pointer"
            >
                <Icon icon="pepicons-pencil:dots-y" class="text-lg" />
            </button>
        </div>
    </div>
</template>
