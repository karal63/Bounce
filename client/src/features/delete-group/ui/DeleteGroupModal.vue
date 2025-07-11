<script setup lang="ts">
import DefaultModal from "@/shared/ui/DefaultModal.vue";
import { useDeleteGroupStore } from "../model/deleteGroupStore";
import { ref } from "vue";

const deleteGroupStore = useDeleteGroupStore();

const repeatedName = ref("");
const error = ref("");

const submit = () => {
    if (repeatedName.value === deleteGroupStore.contextGroup?.name) {
        console.log("delete");
    }
};
</script>

<template>
    <DefaultModal
        v-if="deleteGroupStore.isDeleteModalOpen"
        :storeState="deleteGroupStore.isDeleteModalOpen"
        @closeModal="deleteGroupStore.isDeleteModalOpen = false"
        event="Delete group"
    >
        <div class="flex-col items-center">
            <p class="text-white/70">
                Are you sure you want to delete
                <span class="text-red-500">{{
                    deleteGroupStore.contextGroup?.name
                }}</span>
                group?
            </p>

            <span class="text-sm mt-3 text-white/70 mb-1"
                >Enter your group name to confirm</span
            >
            <input
                type="text"
                v-model="repeatedName"
                placeholder="your-group-name"
                class="w-[300px] px-3 py-3 mb-4 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:border-white/10 focus:ring-purple-500 transition"
            />

            <button
                @click="submit"
                class="border border-red-500 text-red-500 px-7 py-2 rounded-md cursor-pointer hover:border-red-700 hover:text-red-700 transition-all"
            >
                Delete
            </button>
        </div>
    </DefaultModal>
</template>
