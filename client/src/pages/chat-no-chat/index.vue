<script setup lang="ts">
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { onMounted } from "vue";

// when clickong to user, set id nad navigat eto path
// created table in db, connect that if you click to the user message button it adds it and then you can see it on the home page
const currentChatStore = useCurrentChatStore();

onMounted(async () => {
    // await getMessagedUsers()
});
</script>

<template>
    <div class="flex w-full h-full">
        <div class="w-[80%] flex-center flex-col">
            <div class="flex items-center gap-3">
                <div class="flex-col gap-1">
                    <div class="bg-purple-900 w-6 h-2 rounded-xl -ml-1"></div>
                    <div class="bg-purple-900 w-6 h-2 rounded-xl"></div>
                    <div class="bg-purple-900 w-6 h-2 rounded-xl ml-1"></div>
                </div>
                <h1 class="text-3xl font-bold text-purple-900">Bounce</h1>
            </div>
            <p class="w-[300px] text-grayDull text-center mt-2 leading-5">
                Share moments, chat with friends, and stay connected. Simple,
                fun, and social.
            </p>

            <div class="mt-24 text-grayDull text-lg">
                Start chatting by joining a
                <span class="bg-purple-900/40 px-2 rounded-md font-semibold"
                    >group</span
                >
                from the
                <span class="bg-purple-900/40 px-2 rounded-md font-semibold"
                    >Sidebar</span
                >.
            </div>
        </div>

        <ul
            class="bg-mainHoverDarkBg rounded-md w-[20%] max-h-max flex-col gap-2 p-2"
        >
            <li
                v-for="user of currentChatStore.messagedUsers"
                class="py-1 px-1 flex items-center justify-between gap-2 hover:bg-mainHoverOnGray rounded-xl cursor-pointer transition-all"
            >
                <div class="flex items-center gap-2">
                    <UserAvatar size="40" />
                    <div>
                        <h3 class="text-lg">{{ user.userId }}</h3>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
