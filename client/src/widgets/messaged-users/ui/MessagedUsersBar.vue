<script setup lang="ts">
import { MessagedUsersList } from "@/features/chat-messaged-users";
import { default as SearchBar } from "./SearchBar.vue";
import { ref, watch } from "vue";
import type { MessagedUser } from "@/shared/types/MessagedUser";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

const currentChatStore = useCurrentChatStore();

const filteredUsers = ref<MessagedUser[]>(currentChatStore.messagedUsers);

const filter = (input: string) => {
    if (!input) {
        filteredUsers.value = currentChatStore.messagedUsers;
    } else {
        filteredUsers.value = filteredUsers.value.filter((user) => {
            const userName = user.otherUserName.toLowerCase();
            const userInout = input.trim().toLowerCase();
            if (userName.includes(userInout)) return true;
        });
    }
};

watch(
    () => currentChatStore.messagedUsers,
    () => {
        filteredUsers.value = currentChatStore.messagedUsers;
    }
);
</script>

<template>
    <div class="w-[20%] flex-col gap-4">
        <SearchBar @filter="filter" />
        <MessagedUsersList :filteredUsers="filteredUsers" />
    </div>
</template>
