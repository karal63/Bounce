<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useShareModalStore } from "@/features/group-share-link";
import { useUiStore } from "@/shared/model/uiStore";
import { useRoute } from "vue-router";

const shareModalStore = useShareModalStore();
const uiStore = useUiStore();
const route = useRoute();

const currentChatStore = useCurrentChatStore();

const getGroupName = computed(() => {
    const room = currentChatStore.currentRoom;
    let group;

    if (room.type === "group") {
        group = currentChatStore.groups.find((gr) => gr.id === room.id)?.name;
    } else if (room.type === "direct") {
        group = currentChatStore.messagedUsers.find(
            (user) => user.otherUserId === room.id
        )?.otherUserName;
    }

    return group ?? "error: Group not found";
});

const showShareLinkModal = () => {
    shareModalStore.isShareModalOpen = true;
};
</script>

<template>
    <div
        class="h-[8%] bg-mainHoverDarkBg px-4 py-2 rounded-md flex justify-between items-center"
    >
        <h1 class="text-2xl">{{ getGroupName }}</h1>
        <div
            v-if="currentChatStore.currentRoom.id"
            class="flex items-center gap-2"
        >
            <button
                v-if="
                    route.path.startsWith('/chat') &&
                    currentChatStore.currentRoom.type === 'group'
                "
                @click="showShareLinkModal"
                class="text-2xl w-10 h-10 flex-center hover:bg-mainHoverOnGray rounded-full transition-all cursor-pointer"
            >
                <Icon icon="solar:share-line-duotone" />
            </button>
            <button
                v-if="
                    route.path.startsWith('/chat') &&
                    currentChatStore.currentRoom.type === 'group'
                "
                @click="uiStore.toggleMembersBar()"
                class="text-2xl w-10 h-10 flex-center hover:bg-mainHoverOnGray rounded-full transition-all cursor-pointer"
            >
                <Icon icon="fluent:person-32-filled" />
            </button>
            <RouterLink
                v-if="
                    route.path.startsWith('/chat') &&
                    currentChatStore.hasPermissions &&
                    currentChatStore.currentRoom.type === 'group'
                "
                to="/chat/settings"
                class="text-2xl w-10 h-10 flex-center hover:bg-mainHoverOnGray rounded-full transition-all cursor-pointer"
            >
                <Icon icon="material-symbols:settings-rounded" />
            </RouterLink>

            <RouterLink
                v-if="route.path === '/chat/settings'"
                to="/chat"
                class="h-10 px-5 flex-center gap-1 border border-mainHoverOnGray hover:bg-mainHoverOnGray rounded-md transition-all cursor-pointer"
            >
                <span class="text-lg">Back</span>
                <Icon icon="material-symbols:home-rounded" class="text-2xl" />
            </RouterLink>
        </div>
    </div>
</template>
