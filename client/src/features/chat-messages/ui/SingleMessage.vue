<script setup lang="ts">
import type { MessageWithName } from "@/shared/types/Message";
import { checkPerson } from "../lib/checkPerson";
import { ref, type Ref } from "vue";
import { useHover } from "@/shared/lib/hooks/useHover";
import { Icon } from "@iconify/vue";
import { useReplyToMessageStore } from "@/shared/model/replyToMessageStore";
import { findMessageById } from "@/shared/lib/helpers/findMessageById";
import { getTime } from "@/shared/lib/helpers/getTime";
import { getAttachmentsForMessage } from "../lib/getAttachmentsForMessage";
import { useImagePreviewStore } from "@/features/image-preview";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import heartIcon from "@/shared/assets/heart.png";
import MessageReactions from "./MessageReactions.vue";
import { useReaction } from "@/features/reaction";

const replyToMessageStore = useReplyToMessageStore();
const imagePreviewStore = useImagePreviewStore();
const { addReaction } = useReaction();

const props = defineProps<{
    message: MessageWithName;
    pos: HTMLElement | null;
}>();
const emit = defineEmits<{
    (
        e: "showContext",
        targetElement: Ref<HTMLElement | null>,
        message: MessageWithName,
        type: "reactions" | "context"
    ): void;
}>();

const messageRef = ref<HTMLElement | null>(null);
const buttonRef = ref<HTMLElement | null>(null);

const isHovering = ref(false);

useHover(
    messageRef,
    () => (isHovering.value = true),
    () => (isHovering.value = false)
);

const showContext = () => {
    emit("showContext", buttonRef, props.message, "context");
};

const showReactions = () => {
    emit("showContext", messageRef, props.message, "reactions");
};

const replyToMessage = (message: MessageWithName) => {
    replyToMessageStore.setReplyMessage(message);
};

const loveMessage = () => {
    addReaction(props.message, "love");
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
                class="flex items-end gap-3"
                :class="checkPerson(message) && 'flex-row-reverse'"
            >
                <UserAvatar alt="member" :src="message.avatarUrl" size="30" />

                <div
                    @contextmenu.prevent="showReactions"
                    class="px-2 py-1 rounded-xl"
                    :class="
                        checkPerson(message)
                            ? 'bg-purple-500 rounded-br-none'
                            : 'bg-white/20 rounded-bl-none'
                    "
                >
                    <div
                        v-for="attachment of getAttachmentsForMessage(
                            message.id
                        )"
                    >
                        <img
                            @click="
                                imagePreviewStore.previewImage = {
                                    isPreviewing: true,
                                    image: attachment,
                                }
                            "
                            :src="attachment.imageUrl"
                            alt="image"
                            class="max-w-[250px] rounded-xl cursor-pointer"
                        />
                    </div>
                    <!-- reply menu -->
                    <div
                        v-if="message.replyToMessageId"
                        class="py-1 px-3 rounded-md flex items-center gap-2"
                        :class="
                            checkPerson(message)
                                ? 'bg-purple-400 flex-row-reverse border-r-3 border-white'
                                : 'bg-purple-500/40 border-l-3 border-purple-400'
                        "
                    >
                        <div class="flex-col">
                            <span class="font-semibold">{{
                                findMessageById(message.replyToMessageId)?.name
                            }}</span>
                            <p
                                class="text-sm max-w-[300px] white-space: normal"
                            >
                                {{
                                    findMessageById(message.replyToMessageId)
                                        ?.content
                                }}
                            </p>
                        </div>
                        <span
                            ><Icon icon="ic:baseline-reply" class="text-lg"
                        /></span>
                    </div>

                    <div
                        class="flex gap-3"
                        :class="
                            checkPerson(message)
                                ? 'justify-end'
                                : 'justify-start'
                        "
                    >
                        <p
                            data-testid="single-message"
                            class="max-w-[300px] whitespace-normal break-words"
                        >
                            {{ message.content }}
                        </p>

                        <div class="flex-col justify-end">
                            <span class="text-[.6rem] text-gray-300">{{
                                getTime(message.sentAt)
                            }}</span>
                        </div>
                    </div>

                    <!--  -->
                    <!-- reactions -->
                    <MessageReactions
                        @checkPerson="checkPerson($event)"
                        :message="message"
                    />
                </div>

                <div
                    v-show="isHovering"
                    class="flex items-center"
                    :class="checkPerson(message) ? 'flex-row-reverse' : ''"
                >
                    <button
                        v-if="!checkPerson(message)"
                        @click="loveMessage"
                        class="w-8 h-8 rounded-full flex-center hover:bg-mainHoverOnGray cursor-pointer transition-all"
                    >
                        <img alt="like" :src="heartIcon" class="w-5" />
                    </button>

                    <button
                        data-testid="reply-button"
                        @click="replyToMessage(message)"
                        class="w-8 h-8 rounded-full flex-center hover:bg-mainHoverOnGray cursor-pointer transition-all"
                    >
                        <Icon icon="ic:baseline-reply" class="text-lg" />
                    </button>

                    <button
                        ref="buttonRef"
                        @click="showContext"
                        class="w-8 h-8 rounded-full flex-center hover:bg-mainHoverOnGray cursor-pointer transition-all"
                    >
                        <Icon icon="pepicons-pencil:dots-y" class="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
