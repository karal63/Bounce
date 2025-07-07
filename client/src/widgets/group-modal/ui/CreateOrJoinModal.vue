<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";
import CreateButton from "./CreateButton.vue";
import { useModalStore } from "@/features/create-or-join";
import { CreateForm } from "@/features/create-or-join";
import { JoinForm } from "@/features/create-or-join";

const modalStore = useModalStore();

const contentRef = ref<HTMLElement | null>(null);
const showContent = ref(false);

const closeModal = () => {
    modalStore.isModalOpen = false;
    modalStore.mode = "";
};

const setMode = (mode: string) => {
    console.log(mode);
    modalStore.mode = mode;
};

watch(
    () => modalStore.isModalOpen,
    (isOpen) => {
        if (isOpen) {
            setTimeout(() => {
                showContent.value = true;
            }, 50);
        } else {
            showContent.value = false;
        }
    }
);

onUnmounted(() => {
    modalStore.mode = "";
});
</script>

<template>
    <div
        v-if="modalStore.isModalOpen"
        @click.self="closeModal"
        class="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center transition-opacity"
    >
        <transition name="zoom-fade">
            <div
                v-show="showContent"
                ref="contentRef"
                class="transition-all duration-300 ease-in-out overflow-hidden bg-mainBorder border border-white/10 rounded-xl flex flex-col gap-3"
                :class="
                    modalStore.mode
                        ? 'w-[400px] h-[300px] px-7 pb-4'
                        : 'w-[400px] h-[200px] p-5'
                "
            >
                <!-- Default button selection -->
                <template v-if="modalStore.mode === ''">
                    <CreateButton mode="Join" @setMode="setMode($event)" />
                    <CreateButton mode="Create" @setMode="setMode($event)" />
                </template>

                <!-- Expanded mode content (placeholder) -->
                <template v-else>
                    <div class="h-full flex-col">
                        <h1
                            class="text-center text-2xl font-semibold mt-5 mb-2"
                        >
                            {{ modalStore.mode }} group
                        </h1>

                        <div class="h-full">
                            <CreateForm v-if="modalStore.mode === 'Create'" />
                            <JoinForm v-else-if="modalStore.mode === 'Join'" />
                        </div>
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>

<style scoped src="./group-modal.animations.css"></style>
