<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import CreateButton from "./CreateButton.vue";
import { useModalStore } from "../model/modal.store";

const modalStore = useModalStore();

const contentRef = ref<HTMLElement | null>(null);

const closeModal = (e) => {
    if (!contentRef.value?.contains(e.target)) {
        modalStore.isModalOpen = false;
        console.log(e.target);
        console.log(contentRef.value);
    }
};
</script>

<template>
    <div
        v-if="modalStore.isModalOpen"
        @click="closeModal"
        class="absolute top-0 right-0 w-full h-full bg-black/40 flex-center"
    >
        <div
            ref="contentRef"
            class="w-[400px] bg-mainBorder border border-white/10 rounded-xl p-5 flex-col gap-3"
        >
            <CreateButton mode="Join" />
            <CreateButton mode="Create" />
        </div>
    </div>
</template>
