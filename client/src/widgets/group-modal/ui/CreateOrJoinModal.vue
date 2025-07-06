<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import CreateButton from "./CreateButton.vue";
import { useModalStore } from "@/features/create-or-join/model/modal.store";

const modalStore = useModalStore();

const contentRef = ref<HTMLElement | null>(null);
const showContent = ref(false);

const closeModal = () => {
    modalStore.isModalOpen = false;
    modalStore.mode = "";
};

const setMode = (mode: string) => {
    modalStore.mode = mode;
    console.log(modalStore.mode);
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

onMounted(() => {
    console.log(modalStore.mode);
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
                class="transition-all duration-300 ease-in-out overflow-hidden bg-mainBorder border border-white/10 rounded-xl p-5 flex flex-col gap-3"
                :class="
                    modalStore.mode
                        ? 'w-[400px] h-[400px]'
                        : 'w-[400px] h-[200px]'
                "
            >
                <!-- Default button selection -->
                <template v-if="modalStore.mode === ''">
                    <CreateButton mode="Join" @setMode="setMode($event)" />
                    <CreateButton mode="Create" @setMode="setMode($event)" />
                </template>

                <!-- Expanded mode content (placeholder) -->
                <template v-else>
                    <div>
                        <h1
                            class="text-center text-2xl font-semibold mt-5 mb-2"
                        >
                            {{ modalStore.mode }} server
                        </h1>

                        <div
                            v-if="modalStore.mode === 'Join'"
                            class="flex justify-center"
                        >
                            <p
                                class="text-sm text-grayDull text-center max-w-3/4"
                            >
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Atque doloribus
                            </p>
                        </div>
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>

<style scoped src="./group-modal.animations.css"></style>
