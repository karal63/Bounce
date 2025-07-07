<script setup lang="ts">
import { ref } from "vue";
import { useModalStore } from "../";
const modalStore = useModalStore();

const groupLink = ref("");

const handleSubmit = () => {
    modalStore.isModalOpen = false;
    modalStore.mode = "";
    // add group
};
</script>

<template>
    <div class="flex-col justify-between h-full">
        <div class="flex-col items-center">
            <p class="text-sm text-white/70 text-center max-w-3/4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                doloribus
            </p>

            <div class="mt-10 flex-col items-center">
                <span class="text-sm mb-1 text-white/70">Join link</span>
                <input
                    v-model="groupLink"
                    type="text"
                    class="w-[300px] px-3 py-3 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    placeholder="http://localhost:5173/AFs2w41l"
                />
            </div>
        </div>

        <div class="flex items-center justify-between">
            <button @click="modalStore.mode = ''" class="cursor-pointer">
                Back
            </button>
            <button
                @click="handleSubmit"
                class="bg-purple-600 hover:bg-purple-800 px-3 py-1 rounded-md cursor-pointer transition-all"
            >
                {{ modalStore.mode }} group
            </button>
        </div>
    </div>
</template>
