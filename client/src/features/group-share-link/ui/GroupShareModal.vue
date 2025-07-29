<script setup lang="ts">
import { ref, watch } from "vue";
import ModalTransition from "@/shared/ui/ModalTransition.vue";
import { useShareModalStore } from "../model/shareModalStore";
import { Icon } from "@iconify/vue";
import { getCurrentGroup } from "../lib/getCurrentGroup";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { Group } from "@/shared/types/Group";
const shareModalStore = useShareModalStore();
const currentChatStore = useCurrentChatStore();

const showContent = ref(false);
const currentGroup = ref<Group | null>(null);
const isCopied = ref(false);

const closeModal = () => {
    shareModalStore.isShareModalOpen = false;
    isCopied.value = false;
};

const copyLink = () => {
    navigator.clipboard.writeText(
        `http://localhost:5173/${getCurrentGroup()?.invitationLink}`
    );
    isCopied.value = true;
};

watch(
    () => shareModalStore.isShareModalOpen,
    (isOpen) => {
        if (isOpen) {
            setTimeout(() => {
                showContent.value = true;
            }, 50);
        } else {
            showContent.value = false;
        }
    }
);

watch(
    () => currentChatStore.currentRoom.id,
    () => {
        currentGroup.value = getCurrentGroup() ?? null;
    },
    { immediate: true }
);
</script>

<template>
    <div
        v-if="shareModalStore.isShareModalOpen"
        @click.self="closeModal"
        class="absolute top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center transition-opacity"
    >
        <ModalTransition name="zoom-fade">
            <div
                v-show="showContent"
                ref="contentRef"
                class="w-[400px] transition-all duration-300 ease-in-out overflow-hidden bg-mainBorder border border-white/10 rounded-xl flex flex-col gap-3"
            >
                <div class="w-[400px] flex-col items-center mt-7 mb-5">
                    <h1 class="text-2xl font-semibold">Share group</h1>

                    <p class="mt-5 border border-white/10 px-4 py-3 rounded-md">
                        http://localhost:5173/{{ currentGroup?.invitationLink }}
                    </p>

                    <button
                        @click="copyLink"
                        class="mt-4 bg-purple-600 flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer hover:bg-purple-800 active:bg-purple-600 transition-all"
                    >
                        Copy
                        <Icon icon="solar:copy-line-duotone" class="text-xl" />
                    </button>
                    <span v-if="isCopied" class="text-sm mt-2">Copied</span>
                </div>
            </div>
        </ModalTransition>
    </div>
</template>
