<script setup lang="ts">
import { ref, toRef, type Ref } from "vue";
import { sidebarStore } from "../model/sidebarStore";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
const sidebar = sidebarStore();

const props = defineProps<{ buttonRef: Ref<HTMLElement | null> }>();

const buttonRef = toRef(props, "buttonRef");

const emit = defineEmits<{
    (event: "logout"): void;
}>();

const contextRef = ref<HTMLElement | null>(null);

useClickOutside(
    contextRef,
    () => {
        sidebar.isProfileContextOpen = false;
    },
    buttonRef
);
</script>

<template>
    <div
        ref="contextRef"
        v-if="sidebar.isProfileContextOpen"
        class="absolute bottom-[120%] left-0 w-full rounded-md border border-mainBorder bg-mainDarkBg"
    >
        <button
            @click="emit('logout')"
            class="w-full text-left hover:bg-mainHoverDarkBg py-2 px-4 cursor-pointer rounded-md transition-all"
        >
            Logout
        </button>
    </div>
</template>
