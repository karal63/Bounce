<script setup lang="ts">
import { Sidebar } from "@/widgets/sidebar";
import { MessageInputBlock } from "@/widgets/message-input-block";
import { CreateOrJoinModal } from "@/widgets/group-modal";
import { MessagesList } from "@/features/chat-messages";
import { ChatTopBar } from "@/widgets/chat-top-bar";
import { GroupShareModal } from "@/features/group-share-link";
import DeleteGroupModal from "@/features/delete-group/ui/DeleteGroupModal.vue";
import { MembersBar } from "@/widgets/members-bar";
import ConfirmKickModal from "@/features/kick-member/ui/ConfirmKickModal.vue";
</script>

<template>
    <div class="text-white flex h-full py-5">
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
    </div>
</template>

<!-- // END POINT HERE -->

<!-- To complete -->
<!-- Learn transitions in vue -->
<!-- Emits to know for 100% -->

<!-- set linter to block imports not from public api -->

<!-- move types from entities and features back because you use it in shared -->
<!-- add useClickOutside hook -->
<!-- i think i dont add MEMBERS locally in array -->

<!-- when you delete somthing you delete it locally immediately but for other users it will be visible untill reload -->
