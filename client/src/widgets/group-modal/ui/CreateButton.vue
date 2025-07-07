<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
    mode: string;
}>();
const emit = defineEmits<{
    (event: "setMode", mode: string): void;
}>();
</script>

<template>
    <button
        @click="emit('setMode', mode)"
        class="w-full bg-mainHoverDarkBg border border-mainDarkBg transition-all py-2 px-4 rounded-xl flex justify-between items-center cursor-pointer"
    >
        <h4 class="text-xl">{{ mode }} new group</h4>
        <div class="h-14 w-14 flex-center text-purple-500 rounded-md text-5xl">
            <Icon
                :icon="
                    mode === 'Join' ? 'iconamoon:enter-thin' : 'iconoir:plus'
                "
            />
        </div>
    </button>
</template>
