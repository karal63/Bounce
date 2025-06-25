<script setup lang="ts">
import { useRouter } from "vue-router";
import { useChatStore } from "../../model/charStore";
const chatStore = useChatStore();
const router = useRouter();

const logout = () => {
    chatStore.isProfileContextOpen = false;
    router.push("/login");
    console.log("log out");
};
</script>

<template>
    <div
        v-if="chatStore.isProfileContextOpen"
        class="absolute bottom-[120%] left-0 w-full rounded-md border border-mainBorder bg-mainDarkBg"
    >
        <button
            @click="logout"
            class="w-full text-left hover:bg-mainHoverDarkBg py-2 px-4 cursor-pointer rounded-md transition-all"
        >
            Logout
        </button>
    </div>
</template>
