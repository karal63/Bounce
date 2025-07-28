<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";
import { Icon } from "@iconify/vue";
import type { ReadyMessage } from "@/shared/types/Message";

import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useSendMessage } from "@/features/send-messege";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

import { findMemberByName } from "@/shared/lib/helpers/findMemberByName";
import MentionList from "./MentionList.vue";
import { useReplyToMessageStore } from "@/shared/model/replyToMessageStore";

const { send } = useSendMessage();
const sessionStore = useSessionStore();
const currentChatStore = useCurrentChatStore();
const replyToMessageStore = useReplyToMessageStore();

const message = ref<ReadyMessage>({
    groupId: null,
    senderId: sessionStore.user?.id,
    content: "",
    mentionedUsersId: [],
    replyToMessageId: "",
});
const isMentionListOpen = ref(false);
const cursorPos = ref<number>(0);
const inputRef = ref<HTMLElement | null>(null);

const submit = () => {
    send(message.value);
    message.value = {
        ...message.value,
        content: "",
        mentionedUsersId: [],
        replyToMessageId: "",
    };
};

function handleInput(event: Event) {
    const input = (event.target as HTMLTextAreaElement).value;
    const cursorPos = (event.target as HTMLTextAreaElement).selectionStart;

    const prevChar = input[cursorPos - 1];
    isMentionListOpen.value = prevChar === "@";
}

const mention = (name: string) => {
    const firstPart = message.value.content.slice(0, cursorPos.value);
    const secondPart = message.value.content.slice(
        cursorPos.value,
        message.value.content.length - 1
    );

    message.value.content = firstPart + name + secondPart;
};

watch(
    () => message.value.content,
    (newContent) => {
        const mentionPattern = /@[\w\d_]+/g;
        const mentions = newContent.match(mentionPattern);
        cursorPos.value = (
            inputRef.value as HTMLTextAreaElement
        ).selectionStart;

        if (mentions) {
            message.value.mentionedUsersId = mentions.map((mention) => {
                const newMention = findMemberByName(
                    currentChatStore.members,
                    mention.slice(1)
                )?.userId;

                if (!newMention) {
                    return null;
                }
                return newMention;
            });
        }
    }
);
</script>

<template>
    <div v-if="currentChatStore.currentRoom.id" class="flex justify-center">
        <div class="w-[60%]">
            <!-- reply menu -->
            <div
                v-if="replyToMessageStore.isReplyig"
                class="flex items-center py-2 border border-b-0 rounded-md border-mainBorder bg-mainDarkBg"
            >
                <div class="pl-3 pr-5">
                    <Icon icon="ic:baseline-reply" class="text-3xl" />
                </div>

                <div class="flex-col w-full">
                    <p class="text-purple-500 font-semibold">
                        Reply to
                        <span>{{
                            replyToMessageStore.replyMessage?.name
                        }}</span>
                    </p>
                    <p>
                        {{ replyToMessageStore.replyMessage?.content }}
                    </p>
                </div>

                <div class="pr-3 pl-5">
                    <!-- close icon -->
                    <button @click="replyToMessageStore.clearReplyMessage()">
                        <Icon
                            icon="pajamas:close"
                            class="text-2xl text-purple-500 cursor-pointer"
                        />
                    </button>
                </div>
            </div>

            <form class="flex items-center gap-2">
                <textarea
                    ref="inputRef"
                    v-model="message.content"
                    @input="handleInput"
                    rows="1"
                    placeholder="Type your message..."
                    class="flex-1 resize-none rounded-md bg-white/10 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                ></textarea>
                <button
                    @click.prevent="submit"
                    type="submit"
                    class="bg-purple-500 text-white px-4 text-2xl h-[48px] rounded-md hover:bg-mainAccentHover transition cursor-pointer"
                >
                    <Icon icon="material-symbols:send" />
                </button>
            </form>

            <MentionList v-if="isMentionListOpen" @mention="mention" />
        </div>
    </div>
</template>
