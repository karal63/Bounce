<script setup lang="ts">
import ContextButton from "@/shared/ui/context-menu/ContextButton.vue";
import ContextMenu from "@/shared/ui/context-menu/ContextMenu.vue";
import { Icon } from "@iconify/vue";

defineProps<{
    areAttachmentsOpen: Boolean;
}>();

defineEmits<{
    (e: "closeAttachments"): void;
}>();

// const replyToMessageStore = useReplyToMessageStore();
</script>

<template>
    <ContextMenu
        v-if="areAttachmentsOpen"
        :left="0"
        :bottom="70"
        width="150"
        @close-context="$emit('closeAttachments')"
    >
        <ContextButton :important="false" class="flex items-center gap-2"
            ><Icon icon="proicons:attach" class="text-xl" /> Attach
            file</ContextButton
        >
        <ContextButton :important="false" class="flex items-center gap-2"
            ><Icon icon="ic:round-photo" class="text-xl" /> Attach
            photo</ContextButton
        >
    </ContextMenu>
</template>
