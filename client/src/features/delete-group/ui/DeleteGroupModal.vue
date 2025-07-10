<script setup lang="ts">
import DefaultModal from "@/shared/ui/DefaultModal.vue";
import { useDeleteGroupStore } from "../model/deleteGroupStore";

const deleteGroupStore = useDeleteGroupStore();
</script>

<template>
    <DefaultModal
        v-if="deleteGroupStore.isDeleteModalOpen"
        @closeModal="deleteGroupStore.isDeleteModalOpen = false"
    >
        <div>123</div>
    </DefaultModal>
</template>
