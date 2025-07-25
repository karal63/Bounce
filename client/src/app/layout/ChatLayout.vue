<script setup lang="ts">
import { Sidebar } from "@/widgets/sidebar";
</script>

<template>
    <div class="w-full h-full flex">
        <Sidebar />
        <router-view />
    </div>
</template>
