<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

const currentChatStore = useCurrentChatStore();

const getGroupName = computed(() => {
    const group = currentChatStore.groups.find(
        (gr) => gr.id === currentChatStore.currentRoom
    );
    return group ? group?.name : "";
});
</script>

<template>
    <div
        class="bg-mainHoverDarkBg px-4 py-2 rounded-md flex justify-between items-center"
    >
        <h1 class="text-2xl">{{ getGroupName }}</h1>
        <div class="relative">
            <button
                class="flex items-center gap-2 hover:bg-white/10 px-2 py-1 rounded-md cursor-pointer"
            >
                <Icon icon="fluent:person-32-filled" class="text-3xl" />Members
                <Icon
                    icon="iconamoon:arrow-up-2-thin"
                    class="text-3xl transform transition-all duration-300"
                />
            </button>

            <!-- :class="isMembersDropdown ? 'rotate-180' : ''" -->

            <!-- dropdown -->
            <!-- <MembersDropdown :isMembersDropdown="isMembersDropdown" /> -->
        </div>
    </div>
</template>
