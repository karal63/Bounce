<script setup lang="ts">
import type { MessageWithName } from "@/shared/types/Message";
import { checkPerson } from "../lib/checkPerson";
import { ref } from "vue";
import { useHover } from "@/shared/lib/hooks/useHover";
import { Icon } from "@iconify/vue";
import MessageContext from "./MessageContext.vue";
import type { Context } from "@/shared/types/Context";
import { useReplyToMessageStore } from "@/shared/model/replyToMessageStore";
const replyToMessageStore = useReplyToMessageStore();

const props = defineProps<{
    message: MessageWithName;
    posLeft: number | undefined;
}>();

const messageRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);

const isHovering = ref(false);
const messageContext = ref<Context>({
    isVisible: false,
    posX: 0,
});

useHover(
    messageRef,
    () => (isHovering.value = true),
    () => (isHovering.value = false)
);

const hideContext = () => {
    messageContext.value.isVisible = false;
};

const showContext = () => {
    const button = buttonRef.value as HTMLElement;
    if (!button) return;
    const rect = button.getBoundingClientRect();

    messageContext.value = {
        isVisible: true,
        posX: props.posLeft ? rect.left - props.posLeft : 0,
    };
};

const replyToMessage = (message: MessageWithName) => {
    replyToMessageStore.setReplyMessage(message);
};
</script>

<template>
    <div
        class="flex relative"
        :class="checkPerson(message) ? 'justify-end' : 'justify-start'"
    >
        <div
            ref="messageRef"
            class="flex items-center gap-3"
            :class="checkPerson(message) && 'flex-row-reverse'"
        >
            <div class="flex items-center gap-3">
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
            </div>

            <div class="flex items-center">
                <button
                    v-show="isHovering"
                    ref="buttonRef"
                    @click="replyToMessage(message)"
                    class="w-8 h-8 rounded-full flex-center hover:bg-mainHoverOnGray cursor-pointer transition-all"
                >
                    <Icon icon="ic:baseline-reply" class="text-lg" />
                </button>

                <button
                    v-show="isHovering"
                    ref="buttonRef"
                    @click="showContext"
                    class="w-8 h-8 rounded-full flex-center hover:bg-mainHoverOnGray cursor-pointer transition-all"
                >
                    <Icon icon="pepicons-pencil:dots-y" class="text-lg" />
                </button>
            </div>
        </div>

        <MessageContext
            v-if="messageContext.isVisible && buttonRef"
            :message="message"
            :messageContext="messageContext"
            @hideContext="hideContext"
        />
    </div>
</template>
