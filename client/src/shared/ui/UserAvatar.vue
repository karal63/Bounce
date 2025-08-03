<script setup lang="ts">
import defaultAvatar from "@/shared/assets/default-user.png";

defineProps<{
    src?: string;
    alt: string;
    size: string;
}>();
</script>

<template>
    <div
        class="rounded-full overflow-hidden flex items-center justify-center bg-purple-900"
        :style="{ width: `${size}px`, height: `${size}px` }"
    >
        <img
            :src="src ? src : defaultAvatar"
            :alt="alt"
            class="w-full h-full object-cover"
        />
    </div>
</template>
