<script setup lang="ts">
import type { ReadyMessage } from "@/features/Chat/sendMessege/model/types/Message";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { io } from "socket.io-client";
import { ref } from "vue";

const socket = io("http://localhost:5000");
const sessionStore = useSessionStore();

const messages = ref<ReadyMessage[]>([
    {
        sender: "1111",
        content: "Hello!",
        sentAt: new Date(),
    },
    {
        sender: "1111",
        content: "Nice!",
        sentAt: new Date(),
    },
    {
        sender: "test",
        content: "WoW!",
        sentAt: new Date(),
    },
]);

socket.on("message", (msg) => {
    console.log(msg);
    messages.value = [...messages.value, msg];
});

const checkPerson = (message: ReadyMessage) => {
    return sessionStore.user?.name === message.sender;
};
</script>

<template>
    <div>Chat</div>

    <div class="flex-col gap-4 mt-10">
        <div
            v-for="message of messages"
            class="flex"
            :class="checkPerson(message) ? 'justify-end' : 'justify-start'"
        >
            <div
                class="flex items-center gap-3"
                :class="checkPerson(message) && 'flex-row-reverse'"
            >
                <div
                    v-if="message.sender"
                    class="w-8 h-8 bg-purple-700 flex-center rounded-full"
                >
                    {{ message.sender[0] }}
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
        </div>
    </div>
</template>
