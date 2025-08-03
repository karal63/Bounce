<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useAttachmentsStore } from "../model/attachmentsStore";
import SingleAttachment from "./SingleAttachment.vue";

const attachmentsStore = useAttachmentsStore();
</script>

<template>
    <div
        v-if="attachmentsStore.isAttachmentsPanelOpen"
        class="absolute bg-mainGray bottom-full left-0 w-full border border-mainBorder px-2 py-2 rounded-xl"
    >
        <div class="flex items-center gap-2">
            <SingleAttachment
                v-for="(attachment, index) of attachmentsStore.attachments"
                :attachment="attachment"
                :index="index"
            />
        </div>

        <button
            @click="attachmentsStore.isAttachmentsPanelOpen = false"
            class="absolute top-2 right-2 text-xl cursor-pointer"
        >
            <Icon icon="ic:round-close" />
        </button>
    </div>
</template>
