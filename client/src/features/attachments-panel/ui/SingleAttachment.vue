<script setup lang="ts">
import type { Attachment } from "@/shared/types/Attachment";
import { useAttachmentsStore } from "../model/attachmentsStore";
import { ref } from "vue";
import { useHover } from "@/shared/lib/hooks/useHover";
import { Icon } from "@iconify/vue";

defineProps<{
    attachment: Attachment;
    index: number;
}>();

const attachmentsStore = useAttachmentsStore();

const attachmentRef = ref<HTMLElement | null>(null);
const isHovering = ref(false);

useHover(
    attachmentRef,
    () => (isHovering.value = true),
    () => (isHovering.value = false)
);

const remove = (id: string) => {
    attachmentsStore.attachments = attachmentsStore.attachments.filter(
        (attachment) => attachment.id !== id
    );
    if (attachmentsStore.attachments.length < 1)
        attachmentsStore.isAttachmentsPanelOpen = false;
};
</script>

<template>
    <div
        ref="attachmentRef"
        @click="remove(attachment.id)"
        class="relative w-20 h-20 flex-center rounded-xl bg-purple-900 transition-all"
    >
        <div class="w-full h-full rounded-xl overflow-hidden">
            <img :src="attachment.url" alt="image" class="w-20" />
        </div>
        <span
            class="absolute z-10 -bottom-1 -right-1 w-5 h-5 bg-white text-black rounded-full flex-center font-semibold"
            >{{ index + 1 }}</span
        >

        <div
            class="absolute top-0 left-0 w-full h-full flex-center bg-black/50 rounded-xl transition-all"
            :class="isHovering ? 'opacity-100' : 'opacity-0'"
        >
            <button class="text-6xl cursor-pointer">
                <Icon icon="ic:round-close" />
            </button>
        </div>
    </div>
</template>
