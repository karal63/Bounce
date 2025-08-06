<script setup lang="ts">
import { checkPerson, getReactionsForMessage } from "@/features/chat-messages";
import { useReaction } from "@/features/reaction";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { MessageWithName } from "@/shared/types/Message";
import type { Reaction } from "@/shared/types/Reaction";
import { ref, watch } from "vue";

const currentChatStore = useCurrentChatStore();
const { deleteReaction } = useReaction();

const props = defineProps<{
    message: MessageWithName;
}>();

const reactions = ref<Reaction[]>([]);

watch(
    () => currentChatStore.reactions,
    () => {
        reactions.value = getReactionsForMessage(props.message.id);
    }
);
</script>

<!-- now in reactions feature create methods like add, delete -->

<template>
    <div
        class="w-full flex gap-1"
        :class="[
            checkPerson(message) ? 'justify-end' : 'justify-start',
            reactions.length > 0 ? 'mt-2 mb-1' : '',
        ]"
    >
        <button
            v-for="reaction in reactions"
            @click="deleteReaction(message, reaction.id)"
            class="px-2 rounded-xl bg-blue-400/75 cursor-pointer hover:bg-blue-400/80 transition-all"
        >
            {{ reaction.sticker }}
            <span>{{ reaction.count }}</span>
        </button>
    </div>
</template>
