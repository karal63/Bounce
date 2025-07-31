<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useAttachmentsStore } from "../model/attachmentsStore";
import { watchEffect } from "vue";

const attachmentsStore = useAttachmentsStore();

watchEffect(() => {
    console.log(attachmentsStore.attachments);
});
</script>

<template>
    <div
        v-if="attachmentsStore.isAttachmentsPanelOpen"
        class="absolute bg-mainGray bottom-full left-0 w-full border border-mainBorder px-2 py-2 rounded-xl"
    >
        <div class="flex items-center">
            <img
                v-for="attachment of attachmentsStore.attachments"
                :src="attachment.url"
                alt="no image"
                class="w-20"
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
