<script setup lang="ts">
import { useChatStore } from "../../model/chatStore";

import { Icon } from "@iconify/vue";
import ProfileContext from "./ProfileContext.vue";
import { useSessionStore } from "@/shared/session/model/sessionStore";

const chatStore = useChatStore();
const sessionStore = useSessionStore();

const emit = defineEmits<{
    (event: "logout"): void;
}>();
</script>

<template>
    <div
        class="border border-mainBorder shadow-purple-400 shadow-xl relative rounded-xl"
    >
        <div
            @click="
                chatStore.isProfileContextOpen = !chatStore.isProfileContextOpen
            "
            class="flex justify-between items-center hover:bg-mainHoverDarkBg transition-all cursor-pointer px-4 py-2 rounded-xl"
        >
            <div class="flex items-center gap-4">
                <div>
                    <div class="w-10 h-10 rounded-full bg-purple-600"></div>
                </div>
                <div>
                    <h4>{{ sessionStore.user?.name }}</h4>
                    <div class="mt-1">
                        <span class="text-sm pr-1">🟢</span>Active
                    </div>
                </div>
            </div>

            <Icon icon="pepicons-pencil:dots-y" class="text-lg" />
        </div>

        <ProfileContext @logout="emit('logout')" />
    </div>
</template>
