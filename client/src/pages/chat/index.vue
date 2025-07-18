<script setup lang="ts">
import { Sidebar } from "@/widgets/sidebar";
import { MessageInputBlock } from "@/widgets/message-input-block";
import { CreateOrJoinModal } from "@/widgets/group-modal";
import { MessagesList } from "@/features/chat-messages";
import { ChatTopBar } from "@/widgets/chat-top-bar";
import { GroupShareModal } from "@/features/group-share-link";
import { DeleteGroupModal } from "@/features/delete-group";
import { MembersBar } from "@/widgets/members-bar";
import { ConfirmKickModal } from "@/features/kick-member";
import { ConfirmBanModal } from "@/features/ban-member";
import { BanReasonModal } from "@/features/show-ban-reason";
</script>

<template>
    <div class="text-white flex h-full">
        <Sidebar />
        <div class="relative ml-10 w-full flex-col">
            <ChatTopBar />
            <div class="flex h-full">
                <div class="relative w-full h-full">
                    <MessagesList />
                    <MessageInputBlock />
                </div>
                <MembersBar />
            </div>
        </div>

        <!-- modal -->
        <CreateOrJoinModal />
        <GroupShareModal />
        <DeleteGroupModal />
        <ConfirmKickModal />
        <ConfirmBanModal />
        <BanReasonModal />
    </div>
</template>

<!-- // END POINT HERE -->

<!-- To complete -->
<!-- Learn transitions in vue -->

<!-- set linter to block imports not from public api -->
