<script setup lang="ts">
import { onMounted, ref } from "vue";
import ModalTransition from "./ModalTransition.vue";
import { useClickOutside } from "../lib/hooks/useClickOutside";

const emit = defineEmits<{
    (event: "closeModal"): void;
}>();
defineProps<{
    event: string;
    storeState: boolean;
    sizeX?: string;
    sizeY?: string;
}>();

const showContent = ref(false);
const modalRef = ref<HTMLElement | null>(null);

onMounted(() => {
    setTimeout(() => {
        showContent.value = true;
    }, 50);
});

useClickOutside(modalRef, () => emit("closeModal"));
</script>

<template>
    <div
        ref="modalRef"
        @click.self="emit('closeModal')"
        class="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center transition-opacity"
    >
        <ModalTransition name="zoom-fade">
            <div
                v-show="showContent"
                class="pb-3 px-4 transition-all duration-300 ease-in-out overflow-hidden bg-mainBorder border border-white/10 rounded-xl flex flex-col gap-3"
                :style="{
                    width: `${sizeX ?? '400'}px`,
                    height: `${sizeY ?? '300'}px`,
                }"
            >
                <h1 class="text-center text-2xl font-semibold mt-5 mb-2">
                    {{ event }}
                </h1>

                <slot />
            </div>
        </ModalTransition>
    </div>
</template>
