<script setup lang="ts">
import { IncomingCallWindow } from "@/features/incoming-call-window";
import { Sidebar } from "@/widgets/sidebar";
</script>

<template>
    <div class="flex-center bg-mainDarkBg px-5 h-full">
        <div class="flex h-full w-[1450px] py-5">
            <Sidebar />
            <router-view />

            <IncomingCallWindow />
        </div>
    </div>
</template>
