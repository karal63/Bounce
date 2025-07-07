<script setup lang="ts">
import { Sidebar } from "@/widgets/sidebar";
import { MessageInputBlock } from "@/widgets/message-input-block";
import { CreateOrJoinModal } from "@/widgets/group-modal";
import { MessagesList } from "@/features/chat-messages";
import { ChatTopBar } from "@/widgets/chat-top-bar";
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

<!-- set linter to block imports not from public api -->

<!-- move types from entities and features back because you use it in shared -->
