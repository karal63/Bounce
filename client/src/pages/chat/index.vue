<script setup lang="ts">
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
import NotificationWindow from "@/widgets/notification/ui/NotificationWindow.vue";
</script>

<template>
    <div class="text-white flex h-full w-full">
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

        <!-- notification -->
        <NotificationWindow />
    </div>
</template>

<!-- // END POINT HERE -->

<!-- To complete -->
<!-- Learn transitions in vue -->

<!-- set linter to block imports not from public api -->
