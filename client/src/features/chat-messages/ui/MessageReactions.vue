<script setup lang="ts">
import { checkPerson, getReactionsForMessage } from "@/features/chat-messages";
import { useReaction } from "@/features/reaction";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { MessageWithName } from "@/shared/types/Message";
import type { Reaction } from "@/shared/types/Reaction";
import { ref, watch } from "vue";
import { checkIfReacted } from "../lib/checkIfReacted";

const currentChatStore = useCurrentChatStore();
const { handleClick } = useReaction();

const props = defineProps<{
    message: MessageWithName;
}>();

const reactions = ref<Reaction[]>([]);

watch(
    () => currentChatStore.reactions,
    () => {
        reactions.value = getReactionsForMessage(props.message.id);
        console.log(reactions.value);
    }
);
</script>

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
            @click="handleClick(message, reaction)"
            class="px-2 rounded-xl hover:bg-blue-400/80 cursor-pointer transition-all"
            :class="
                checkIfReacted(reaction)
                    ? 'bg-blue-400/75 hover:bg-blue-400'
                    : 'bg-mainGray hover:bg-mainGray/50'
            "
        >
            {{ reaction.sticker }}
            <span>{{ reaction.count }}</span>
        </button>
    </div>
</template>
