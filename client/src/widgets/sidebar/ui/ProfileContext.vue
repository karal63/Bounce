<script setup lang="ts">
import { ref, toRef } from "vue";
import { sidebarStore } from "../model/sidebarStore";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import { Icon } from "@iconify/vue";
import { useUploadAvatar } from "@/features/upload-avatar";
import { useLogout } from "@/features/auth/logout";

const sidebar = sidebarStore();
const { uploadAvatar, loading } = useUploadAvatar();
const { logout } = useLogout();

const props = defineProps<{ buttonRef: HTMLElement | null }>();

const buttonRef = toRef(props, "buttonRef");
const contextRef = ref<HTMLElement | null>(null);

useClickOutside(
    contextRef,
    () => {
        sidebar.isProfileContextOpen = false;
    },
    buttonRef
);

const setFile = async (file: File | undefined) => {
    if (!file) return;
    await uploadAvatar(file);
};
</script>

<template>
    <div
        ref="contextRef"
        v-if="sidebar.isProfileContextOpen"
        class="absolute bottom-[120%] left-0 w-full rounded-md border border-mainBorder bg-mainDarkBg"
    >
        <input
            type="file"
            id="input"
            @change="(e) => { setFile((e.target as HTMLInputElement).files?.[0]) }"
            :disabled="loading"
            class="hidden"
        />
        <label
            for="input"
            class="flex items-center justify-between w-full text-left hover:bg-mainHoverDarkBg py-2 px-4 rounded-md transition-all cursor-pointer"
        >
            <span :class="loading ? 'text-gray-500' : ''">Attach avatar</span>
            <span v-if="loading"
                ><Icon icon="line-md:loading-loop" class="text-xl" /></span
        ></label>

        <button
            @click="logout"
            class="w-full text-left hover:bg-mainHoverDarkBg py-2 px-4 cursor-pointer rounded-md transition-all"
        >
            Logout
        </button>
    </div>
</template>
