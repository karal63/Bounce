<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useSendMessage } from "@/features/send-messege";
import type { ReadyMessage } from "@/entities/message";

const { send } = useSendMessage();
const sessionStore = useSessionStore();

const message = ref<ReadyMessage>({
    groupId: null,
    senderId: sessionStore.user?.id,
    content: "",
});

const submit = () => {
    send(message.value);
};
</script>

<template>
    <div class="absolute bottom-0 right-0 w-full">
        <form class="flex items-center gap-2">
            <textarea
                v-model="message.content"
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
    </div>
</template>
