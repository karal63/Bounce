<script setup lang="ts">
import { onMounted, ref } from "vue";
import ModalTransition from "./ModalTransition.vue";

const emit = defineEmits<{
    (event: "closeModal"): void;
}>();
defineProps<{
    event: string;
    storeState: boolean;
}>();

const showContent = ref(false);

onMounted(() => {
    setTimeout(() => {
        showContent.value = true;
    }, 50);
});
</script>

<template>
    <div
        @click.self="emit('closeModal')"
        class="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center transition-opacity"
    >
        <ModalTransition name="zoom-fade">
            <div
                v-show="showContent"
                class="w-[400px] h-[260px] transition-all duration-300 ease-in-out overflow-hidden bg-mainBorder border border-white/10 rounded-xl flex flex-col gap-3"
            >
                <h1 class="text-center text-2xl font-semibold mt-5 mb-2">
                    {{ event }}
                </h1>

                <slot />
            </div>
        </ModalTransition>
    </div>
</template>
