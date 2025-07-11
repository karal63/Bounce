<script setup lang="ts">
import DefaultModal from "@/shared/ui/DefaultModal.vue";
import { useDeleteGroupStore } from "../model/deleteGroupStore";
import { ref } from "vue";
import { useDeleteGroup } from "../model/useDeleteGroup";

const deleteGroupStore = useDeleteGroupStore();
const { deleteGroup } = useDeleteGroup();

const repeatedName = ref("");

const submit = () => {
    if (repeatedName.value === deleteGroupStore.contextGroup?.name) {
        deleteGroup();
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
        <div class="flex-col justify-between h-full">
            <div class="flex-col items-center">
                <p class="text-white/70 text-center">
                    Are you sure you want to delete
                    <span class="text-red-500">{{
                        deleteGroupStore.contextGroup?.name
                    }}</span>
                    group?
                </p>

                <span class="text-sm mt-6 text-white/70 mb-1"
                    >Enter your group name to confirm</span
                >
                <input
                    type="text"
                    v-model="repeatedName"
                    placeholder="your-group-name"
                    class="w-[300px] px-3 py-3 mb-4 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:border-white/10 focus:ring-purple-500 transition"
                />
            </div>

            <div class="flex items-center justify-between">
                <button
                    @click="deleteGroupStore.isDeleteModalOpen = false"
                    class="cursor-pointer"
                >
                    Back
                </button>
                <button
                    @click="submit"
                    class="bg-red-600 hover:bg-red-800 px-3 py-1 rounded-md cursor-pointer transition-all"
                >
                    Delete group
                </button>
            </div>
        </div>
    </DefaultModal>
</template>
