<script setup lang="ts">
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import type { ReadyMessage } from "@/shared/types/Message";

import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useSendMessage } from "@/features/send-messege";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

import { findMemberByName } from "@/shared/lib/helpers/findMemberByName";
import MentionList from "./MentionList.vue";
import ReplyBar from "./ReplyBar.vue";
import Attachment from "./Attachment.vue";
import AttachmentsPanel from "@/features/attachments-panel/ui/AttachmentsPanel.vue";

const { send } = useSendMessage();
const sessionStore = useSessionStore();
const currentChatStore = useCurrentChatStore();

const message = ref<ReadyMessage>({
    groupId: null,
    senderId: sessionStore.user?.id,
    content: "",
    mentionedUsersId: [],
    replyToMessageId: "",
    attachments: [],
});
const isMentionListOpen = ref(false);
const cursorPos = ref<number>(0);
const inputRef = ref<HTMLElement | null>(null);
const areAttachmentsOpen = ref(false);

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
    isMentionListOpen.value = false;
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
    <div
        v-if="currentChatStore.currentRoom.id"
        class="h-[10%] flex justify-center w-full"
    >
        <div
            class="relative max-3xl:w-[60%] max-xl:w-[80%] max-lg:w-full pt-4 border-t border-mainBorder"
        >
            <!-- reply menu -->
            <ReplyBar />
            <Attachment
                @closeAttachments="areAttachmentsOpen = false"
                :areAttachmentsOpen="areAttachmentsOpen"
            />
            <AttachmentsPanel />

            <form class="flex items-center gap-2">
                <button
                    @click.prevent="areAttachmentsOpen = true"
                    class="cursor-pointer"
                >
                    <Icon
                        icon="iconoir:plus"
                        class="text-purple-400 text-4xl"
                    />
                </button>
                <textarea
                    data-testid="message-input"
                    ref="inputRef"
                    v-model="message.content"
                    @input="handleInput"
                    rows="1"
                    placeholder="Type your message..."
                    class="flex-1 resize-none rounded-md bg-white/10 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                ></textarea>
                <button
                    data-testid="send-message-button"
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
