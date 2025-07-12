<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useShareModalStore } from "@/features/group-share-link";
import { useUiStore } from "@/shared/model/uiStore";

const shareModalStore = useShareModalStore();
const uiStore = useUiStore();

const currentChatStore = useCurrentChatStore();

const getGroupName = computed(() => {
    const group = currentChatStore.groups.find(
        (gr) => gr.id === currentChatStore.currentRoom
    );
    return group ? group?.name : "";
});

const showShareLinkModal = () => {
    shareModalStore.isShareModalOpen = true;
};
</script>

<template>
    <div
        class="bg-mainHoverDarkBg px-4 py-2 rounded-md flex justify-between items-center"
    >
        <h1 class="text-2xl">{{ getGroupName }}</h1>
        <div
            v-if="currentChatStore.currentRoom"
            class="flex items-center gap-2"
        >
            <button
                @click="showShareLinkModal"
                class="text-2xl w-10 h-10 flex-center hover:bg-mainHoverOnGray rounded-full transition-all cursor-pointer"
            >
                <Icon icon="solar:share-line-duotone" />
            </button>
            <button
                @click="uiStore.toggleMembersBar()"
                class="text-2xl w-10 h-10 flex-center hover:bg-mainHoverOnGray rounded-full transition-all cursor-pointer"
            >
                <Icon icon="fluent:person-32-filled" />
            </button>
        </div>
    </div>
</template>
