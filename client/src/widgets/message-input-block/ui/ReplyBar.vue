<script setup lang="ts">
import { useReplyToMessageStore } from "@/shared/model/replyToMessageStore";
import { Icon } from "@iconify/vue";

const replyToMessageStore = useReplyToMessageStore();
</script>

<template>
    <div
        v-if="replyToMessageStore.isReplyig"
        class="absolute bg-mainDarkBg bottom-full left-0 w-full flex items-center py-2 border rounded-md border-mainBorder"
    >
        <div class="pl-3 pr-5">
            <Icon icon="ic:baseline-reply" class="text-3xl" />
        </div>

        <div class="flex-col w-full">
            <p class="text-purple-500 font-semibold">
                Reply to
                <span>{{ replyToMessageStore.replyMessage?.name }}</span>
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
</template>
