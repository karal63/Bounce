<script setup lang="ts">
import ProfileBar from "@/entities/Chat/ui/Sidebar/ProfileBar.vue";
</script>

<template>
    <div class="min-w-[200px] max-w-[250px] h-full flex-col justify-between">
        <div>
            <!-- logo -->
            <div class="flex-col gap-1">
                <div class="bg-purple-500 w-6 h-2 rounded-xl -ml-1"></div>
                <div class="bg-purple-500 w-6 h-2 rounded-xl"></div>
                <div class="bg-purple-500 w-6 h-2 rounded-xl ml-1"></div>
            </div>

            <!-- chats -->
            <h1 class="text-3xl font-light mt-6">Chats</h1>
            <div class="mt-5 h-[500px] bg-mainHoverDarkBg rounded-xl"></div>
        </div>

        <!-- menu context -->
        <ProfileBar />
    </div>
</template>
