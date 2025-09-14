<script setup lang="ts">
import { Sidebar } from "@/widgets/sidebar";
</script>

<template>
    <div class="flex-center bg-mainDarkBg h-full">
        <div class="flex h-full w-full">
            <div
                class="bg-mainHoverDarkBg pr-10 w-[20%] flex justify-end py-5 pl-5"
            >
                <Sidebar />
            </div>
            <div class="ml-10 w-[80%] py-5 pr-5 flex justify-start">
                <div class="w-[93%]">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>
