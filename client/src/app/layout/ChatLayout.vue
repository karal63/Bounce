<script setup lang="ts">
import { Sidebar } from "@/widgets/sidebar";
</script>

<template>
    <div class="flex-center bg-mainDarkBg px-5 h-full">
        <div class="flex h-full w-[1450px] py-5">
            <Sidebar />
            <router-view />
        </div>
    </div>
</template>
