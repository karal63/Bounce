<script setup lang="ts">
import ContextButton from "@/shared/ui/context-menu/ContextButton.vue";
import ContextMenu from "@/shared/ui/context-menu/ContextMenu.vue";
import { Icon } from "@iconify/vue";
import { ref, watchEffect } from "vue";
import { useUploadImage } from "../model/useUploadImage";

const { uploadImage } = useUploadImage();

defineProps<{
    areAttachmentsOpen: Boolean;
}>();

defineEmits<{
    (e: "closeAttachments"): void;
}>();

const setFile = async (file: File | undefined) => {
    await uploadImage(file);
};
</script>

<template>
    <ContextMenu
        v-if="areAttachmentsOpen"
        :left="0"
        :bottom="70"
        width="160"
        @close-context="$emit('closeAttachments')"
    >
        <ContextButton :important="false" class="flex items-center gap-2"
            ><Icon icon="proicons:attach" class="text-xl" /> Attach
            file</ContextButton
        >
        <ContextButton :important="false" class="flex items-center gap-2"
            ><Icon icon="ic:round-photo" class="text-xl" />
            <input
                type="file"
                id="input"
                class="hidden"
                @change="(e) => { setFile((e.target as HTMLInputElement).files?.[0]) }"
            />
            <label for="input" class="cursor-pointer">Attach photo</label>
        </ContextButton>
    </ContextMenu>
</template>
