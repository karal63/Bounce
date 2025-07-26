<script setup lang="ts">
import { DeleteGroupModal } from "@/features/delete-group";
import { BanReasonModal } from "@/features/show-ban-reason";
import { DefaultChatWindow } from "@/widgets/default-chat-window";
import { CreateOrJoinModal } from "@/widgets/group-modal";
import { MessagedUsersBar } from "@/widgets/messaged-users";

// when clickong to user, set id nad navigat eto path
// created table in db, connect that if you click to the user message button it adds it and then you can see it on the home page
</script>

<template>
    <div class="flex w-full h-full">
        <DefaultChatWindow />
        <MessagedUsersBar />

        <CreateOrJoinModal />
        <DeleteGroupModal />
        <BanReasonModal />
    </div>
</template>
