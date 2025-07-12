<script setup lang="ts">
defineProps<{
    // src?: string;
    alt?: string;
    size?: string;
}>();
</script>

<template>
    <div
        class="rounded-full overflow-hidden flex items-center justify-center bg-purple-900"
        :style="{ width: `${size}px`, height: `${size}px` }"
    >
        <img
            src="../assets/userAvatar.png"
            :alt="alt || 'User Avatar'"
            class="w-full h-full object-cover"
        />
        <!-- <span v-else class="text-gray-500 text-sm">?</span> -->
    </div>
</template>
