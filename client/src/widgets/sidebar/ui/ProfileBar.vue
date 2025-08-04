<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { sidebarStore } from "../model/sidebarStore";
import ProfileContext from "./ProfileContext.vue";
import { ref } from "vue";
import UserAvatar from "@/shared/ui/UserAvatar.vue";

const sidebar = sidebarStore();
const sessionStore = useSessionStore();
const buttonRef = ref<HTMLElement | null>(null);

const emit = defineEmits<{
    (event: "logout"): void;
}>();
</script>

<template>
    <div
        class="border border-mainBorder shadow-purple-400 shadow-xl relative rounded-xl"
    >
        <div
            ref="buttonRef"
            @click="
                sidebar.isProfileContextOpen = !sidebar.isProfileContextOpen
            "
            class="flex justify-between items-center hover:bg-mainHoverDarkBg transition-all cursor-pointer px-4 py-2 rounded-xl"
        >
            <div class="flex items-center gap-4">
                <div>
                    <div>
                        <UserAvatar
                            :src="sessionStore.user?.avatarUrl"
                            alt="user"
                            size="40"
                        />
                    </div>
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

        <ProfileContext :buttonRef="buttonRef" @logout="emit('logout')" />
    </div>
</template>
