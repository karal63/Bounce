<script setup lang="ts">
import { ref } from "vue";
import { useModalStore } from "../";
import { useJoinGroup } from "../model/useJoinGroup";
const modalStore = useModalStore();
const { join } = useJoinGroup();

const groupLink = ref("");

const handleSubmit = async () => {
    await join(groupLink.value);
};
</script>

<template>
    <div class="flex-col justify-between h-full">
        <div class="flex-col items-center">
            <p class="text-sm text-white/70 text-center max-w-3/4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                doloribus
            </p>

            <div class="mt-10 flex-col relative">
                <span class="text-sm mb-1 text-white/70 pl-3"
                    >invitation link:</span
                >
                <input
                    v-model="groupLink"
                    type="text"
                    class="w-[300px] px-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:border-white/10 focus:ring-purple-500 transition"
                    :class="
                        modalStore.error ? 'border-red-500' : 'border-white/10'
                    "
                    placeholder="http://localhost:5173/AFs2w41l"
                />
                <p
                    v-if="modalStore.error"
                    class="absolute -bottom-2 right-3 text-[.8rem] bg-mainBorder px-2"
                >
                    {{ modalStore.error }}
                </p>
            </div>
        </div>

        <div class="flex items-center justify-between">
            <button
                @click="
                    modalStore.mode = '';
                    modalStore.error = '';
                "
                class="cursor-pointer"
            >
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
