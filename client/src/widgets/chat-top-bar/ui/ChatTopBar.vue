<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, watchEffect } from "vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useShareModalStore } from "@/features/group-share-link";
import { useUiStore } from "@/shared/model/uiStore";
import { useRoute } from "vue-router";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { findMessagedUserById } from "@/shared/lib/helpers";
import { checkIfUserTyping } from "../lib/helpers/checkIfUserTyping";
import { findMemberById } from "@/shared/lib/helpers/findMemberById";
import { useSessionStore } from "@/shared/session/model/sessionStore";

const shareModalStore = useShareModalStore();
const uiStore = useUiStore();
const route = useRoute();

const currentChatStore = useCurrentChatStore();
const sessionStore = useSessionStore();

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

watchEffect(() => {
    console.log(currentChatStore.onlineUsers);
});

console.log("render");
</script>

<template>
    <div
        class="h-[8%] bg-mainHoverDarkBg px-4 py-2 rounded-md flex justify-between items-center"
    >
        <div class="flex items-center gap-3">
            <div class="relative">
                <UserAvatar
                    v-if="
                        currentChatStore.currentRoom.id &&
                        currentChatStore.currentRoom.type === 'direct'
                    "
                    size="40"
                    alt="user avatar"
                    :src="
                        findMessagedUserById(currentChatStore.currentRoom.id)
                            ?.avatarUrl
                    "
                />

                <span
                    v-if="
                        currentChatStore.currentRoom.id &&
                        currentChatStore.currentRoom.type === 'direct' &&
                        currentChatStore.onlineUsers.has(
                            currentChatStore.currentRoom.id
                        )
                    "
                    class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full"
                ></span>
            </div>
            <div class="flex-col">
                <h1 class="text-2xl">{{ getGroupName }}</h1>
                <!-- typing indicator -->
                <div
                    v-if="checkIfUserTyping()"
                    class="h-5 flex items-center gap-2 text-purple-500"
                >
                    <span v-if="currentChatStore.currentRoom.type === 'group'"
                        >{{
                            findMemberById(
                                currentChatStore.members,
                                checkIfUserTyping()?.typingUserId
                            )?.name
                        }}
                        typing</span
                    >
                    <span v-else> Typing </span>
                    <span>
                        <Icon icon="svg-spinners:3-dots-bounce" />
                    </span>
                </div>
                <p
                    v-else-if="
                        currentChatStore.currentRoom.id &&
                        (currentChatStore.onlineUsers.has(
                            currentChatStore.currentRoom.id
                        ) ||
                            currentChatStore.members.some(
                                (member) =>
                                    member.userId !== sessionStore.user?.id &&
                                    currentChatStore.onlineUsers.has(
                                        member.userId
                                    )
                            ))
                    "
                    class="text-green-500 text-sm"
                >
                    Online
                </p>
                <p v-else class="text-secondary text-sm">Offline</p>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <button
                v-if="
                    route.path.startsWith('/chat') &&
                    !route.path.startsWith('/chat/settings') &&
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
                    !route.path.startsWith('/chat/settings') &&
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
                    !route.path.startsWith('/chat/settings') &&
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
