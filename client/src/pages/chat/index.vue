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
import { NotificationWindow } from "@/widgets/notification";
import { ImagePreviewModal } from "@/shared/ui";
import { onMounted } from "vue";
import { useGetStickers } from "@/shared/model/useGetStickers";
import { useTypingIndicator } from "@/features/typing-indicator";
import { CallWindow } from "@/features/call-window";

const { getStickers } = useGetStickers();

onMounted(async () => {
    await getStickers();
    useTypingIndicator();
});
</script>

<template>
    <div class="text-white flex h-full w-full overflow-hidden">
        <div class="relative w-full flex-col">
            <ChatTopBar />
            <div class="relative flex h-[92%]">
                <div class="relative w-full h-full flex-col">
                    <MessagesList />
                    <MessageInputBlock />
                </div>
                <MembersBar />

                <!-- call window -->
                <CallWindow />
            </div>
        </div>

        <!-- modal -->
        <CreateOrJoinModal />
        <GroupShareModal />
        <DeleteGroupModal />
        <ConfirmKickModal />
        <ConfirmBanModal />
        <BanReasonModal />
        <ImagePreviewModal />

        <!-- notification -->
        <NotificationWindow />
    </div>
</template>

<!-- Learn transitions in vue -->
<!-- set linter to block imports not from public api -->
