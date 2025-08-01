<script setup lang="ts">
import { useImagePreviewStore } from "@/features/image-preview";
import ModalTransition from "../ModalTransition.vue";

const imagePreviewStore = useImagePreviewStore();
</script>

<template>
    <ModalTransition>
        <div
            v-show="imagePreviewStore.previewImage.isPreviewing"
            @click.self="imagePreviewStore.closeImagePreview"
            class="absolute top-0 left-0 w-full h-full bg-black/70 flex-center"
        >
            <div class="max-w-[300px]">
                <img :src="imagePreviewStore.previewImage.image?.imageUrl" />
            </div>
        </div>
    </ModalTransition>
</template>
