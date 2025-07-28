<script setup lang="ts">
import type { MessageWithName } from "@/shared/types/Message";
import { checkPerson } from "../lib/checkPerson";
import { ref } from "vue";
import { useHover } from "@/shared/lib/hooks/useHover";
import { Icon } from "@iconify/vue";
import MessageContext from "./MessageContext.vue";
import type { Context } from "@/shared/types/Context";
import { useReplyToMessageStore } from "@/shared/model/replyToMessageStore";
import { findMessageById } from "@/shared/lib/helpers/findMessageById";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { getTime } from "@/shared/lib/helpers/getTime";
const replyToMessageStore = useReplyToMessageStore();
const currendChatStore = useCurrentChatStore();

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
            :class="checkPerson(message) ? 'items-end' : 'items-start'"
        >
            <div
                class="flex items-center gap-3"
                :class="checkPerson(message) && 'flex-row-reverse'"
            >
                <div
                    v-if="
                        message.senderId &&
                        currendChatStore.currentRoom.type === 'group'
                    "
                    class="w-8 h-8 bg-purple-700 flex-center rounded-full"
                >
                    {{ message.name[0] }}
                </div>

                <div
                    class="max-w-max px-2 py-1 rounded-xl"
                    :class="
                        checkPerson(message)
                            ? 'bg-purple-500 rounded-br-none'
                            : 'bg-white/20 rounded-bl-none'
                    "
                >
                    <!-- reply menu -->
                    <div
                        v-if="message.replyToMessageId"
                        class="py-1 px-3 rounded-md flex items-center gap-2"
                        :class="
                            checkPerson(message)
                                ? 'bg-purple-400'
                                : 'bg-purple-500/50 flex-row-reverse'
                        "
                    >
                        <div class="flex-col">
                            <span class="font-semibold">{{
                                findMessageById(message.replyToMessageId)?.name
                            }}</span>
                            <span class="text-sm">
                                {{
                                    findMessageById(message.replyToMessageId)
                                        ?.content
                                }}
                            </span>
                        </div>
                        <span
                            ><Icon icon="ic:baseline-reply" class="text-lg"
                        /></span>
                    </div>

                    <div class="flex gap-3">
                        <p
                            :class="
                                checkPerson(message) ? 'text-end' : 'text-start'
                            "
                        >
                            {{ message.content }}
                        </p>

                        <div>
                            <span class="text-[.7rem] text-gray-3 00">{{
                                getTime(message.sentAt)
                            }}</span>
                        </div>
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
                        @click="showContext"
                        class="w-8 h-8 rounded-full flex-center hover:bg-mainHoverOnGray cursor-pointer transition-all"
                    >
                        <Icon icon="pepicons-pencil:dots-y" class="text-lg" />
                    </button>
                </div>
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
