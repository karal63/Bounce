<script setup lang="ts">
import ProfileBar from "@/entities/Chat/ui/ProfileBar.vue";
</script>

<template>
    <div class="min-w-[200px] max-w-[250px] h-full flex-col justify-between">
        <div>
            <h1>Logo</h1>
            <h1 class="text-3xl font-light">Chats</h1>
            <div class="mt-5 h-[500px] bg-mainHoverDarkBg rounded-xl"></div>
        </div>

        <ProfileBar />
    </div>
</template>
