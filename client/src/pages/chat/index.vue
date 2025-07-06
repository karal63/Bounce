<script setup lang="ts">
import Sidebar from "@/widgets/sidebar/Sidebar.vue";
import MessageInputBlock from "@/widgets/message-input-block/ui/index.vue";
import CreateOrJoinModal from "@/widgets/group-modal/ui/CreateOrJoinModal.vue";
import MessagesList from "@/features/chat-messages/ui/MessagesList.vue";
import ChatTopBar from "@/widgets/chat-top-bar/ui/ChatTopBar.vue";
</script>

<template>
    <div class="text-white flex h-full py-5">
        <Sidebar />
        <div class="relative ml-10 w-full">
            <ChatTopBar />
            <MessagesList />
            <MessageInputBlock />
        </div>

        <!-- modal -->
        <CreateOrJoinModal />
    </div>
</template>

<!-- // END POINT HERE -->

<!-- To complete -->
<!-- Learn transitions in vue -->
<!-- Emits to know for 100% -->

<!--  !!! create create group api in shared folder (or ask where IN NEW CHAT) -->
<!-- fix logout -->
