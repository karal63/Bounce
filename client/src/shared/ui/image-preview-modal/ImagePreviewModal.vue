<script setup lang="ts">
import { useImagePreviewStore } from "@/features/image-preview";
import ModalTransition from "../ModalTransition.vue";
import { Icon } from "@iconify/vue";

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

            <div class="absolute top-6 flex items-center gap-2">
                <a
                    :download="imagePreviewStore.previewImage.image?.imageUrl"
                    href=""
                    title="ImageName"
                    class="text-3xl cursor-pointer bg-mainGray px-3 rounded-md py-1 hover:bg-white/20 transition-all"
                >
                    <Icon icon="circum:save-down-2" />
                </a>
                <button
                    class="text-3xl cursor-pointer bg-mainGray px-3 rounded-md py-1 hover:bg-white/20 transition-all"
                >
                    <Icon icon="mdi-light:share" />
                </button>
            </div>
        </div>
    </ModalTransition>
</template>
