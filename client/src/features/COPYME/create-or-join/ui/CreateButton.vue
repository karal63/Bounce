<script setup lang="ts">
defineProps<{
    mode: string;
}>();
</script>

<template>
    <button
        class="w-full bg-mainDarkBg hover:bg-mainHoverDarkBg transition-all py-2 px-4 rounded-md flex justify-between cursor-pointer"
    >
        <div class="">
            <h4 class="text-xl">{{ mode }} new group</h4>
        </div>
        <div class="h-14 w-14 bg-purple-500 rounded-md"></div>
    </button>
</template>
