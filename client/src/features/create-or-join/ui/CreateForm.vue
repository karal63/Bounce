<script setup lang="ts">
import { ref } from "vue";
import { useModalStore } from "../model/modal.store";
import { useCreateGroup } from "../model/useCreateGroup";
const modalStore = useModalStore();
const { createGroup } = useCreateGroup();

const groupName = ref("");

const handleSubmit = () => {
    modalStore.isModalOpen = false;
    modalStore.mode = "";
    createGroup(groupName.value);
};
</script>

<template>
    <div class="flex-col justify-between h-full">
        <div class="flex-col items-center">
            <p class="text-sm text-white/70 text-center max-w-3/4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                doloribus
            </p>

            <div class="mt-10">
                <input
                    v-model="groupName"
                    type="text"
                    class="px-3 py-2 text-lg border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
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
