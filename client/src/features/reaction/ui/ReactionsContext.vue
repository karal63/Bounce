<script setup lang="ts">
import type { ReactionContext } from "@/features/reaction/model/types";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useReaction } from "../model/useReaction";

const currentChatStore = useCurrentChatStore();
const { addReaction } = useReaction();

const props = defineProps<{
    reactionPanelContext: ReactionContext;
}>();
const emit = defineEmits<{
    (e: "closeReactions"): void;
}>();

const contextRef = ref<HTMLElement | null>(null);

useClickOutside(contextRef, () => emit("closeReactions"));

const add = async (stickerId: string) => {
    if (!props.reactionPanelContext.message) return;
    await addReaction(props.reactionPanelContext.message, stickerId);
    props.reactionPanelContext.isVisible = false;
};
</script>

<template>
    <div
        ref="contextRef"
        v-if="reactionPanelContext.isVisible"
        class="absolute w-[300px] border border-mainHoverOnGray bg-mainGray py-1 px-2 rounded-md flex items-center justify-between"
        :style="{
            left: `${reactionPanelContext.posX}px`,
            top: `${reactionPanelContext.posY}px`,
        }"
    >
        <div class="flex items-center gap-1">
            <button
                v-for="sticker in currentChatStore.stickers"
                :key="sticker.id"
                @click="add(sticker.id)"
                class="w-8 h-8 flex-center rounded-md hover:bg-mainHoverOnGray cursor-pointer text-xl"
            >
                {{ sticker.sticker }}
            </button>
        </div>

        <button
            class="w-8 h-8 flex-center rounded-md bg-mainHoverOnGray hover:bg-purple-900 cursor-pointer text-xl transition-all"
        >
            <Icon icon="iconoir:plus" class="text-purple-400 text-2xl" />
        </button>
    </div>
</template>
