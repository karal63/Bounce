<script setup lang="ts">
import { Sidebar } from "@/widgets/sidebar";
// import sideBg from "@/shared/assets/side-bg.png";
</script>

<!-- :style="{
                    backgroundImage: `url(${sideBg})`,
                }" -->

<template>
    <div class="flex-center bg-mainDarkBg h-full">
        <div class="flex h-full w-full">
            <div
                class="pr-10 bg-mainHoverDarkBg w-[20%] flex justify-end py-5 pl-5"
            >
                <Sidebar />
            </div>
            <div class="ml-10 w-[80%] py-5 pr-5 flex justify-start">
                <div class="w-[96%]">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>
