<script setup lang="ts">
import { checkPerson, getReactionsForMessage } from "@/features/chat-messages";
import type { MessageWithName } from "@/shared/types/Message";

defineProps<{
    message: MessageWithName;
}>();
</script>

<!-- now in reactions feature create methods like add, delete -->

<template>
    <div
        class="w-full flex gap-1 mt-2 mb-1"
        :class="checkPerson(message) ? 'justify-end' : 'justify-start'"
    >
        <button
            v-for="reaction in getReactionsForMessage(message.id)"
            class="px-2 rounded-xl bg-blue-400/75 cursor-pointer hover:bg-blue-400/80 transition-all"
        >
            {{ reaction.sticker }}
        </button>
    </div>
</template>
