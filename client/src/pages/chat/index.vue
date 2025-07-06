<script setup lang="ts">
import Sidebar from "@/widgets/sidebar/Sidebar.vue";
import MessageInputBlock from "@/widgets/message-input-block/ui/index.vue";
import CreateOrJoinModal from "@/widgets/group-modal/ui/CreateOrJoinModal.vue";
</script>

<template>
    <div class="text-white flex h-full py-5">
        <Sidebar />
        <div class="relative ml-10 w-full">
            <!-- <MessageList /> -->
            <MessageInputBlock />
        </div>
        <!-- <MembersList /> -->

        <!-- modal -->
        <CreateOrJoinModal />
    </div>
</template>

<!-- // END POINT HERE -->
<!-- // 6. commit: 'refactor: move types to entities, change features folder structure' -->
<!-- // 7. Replace groups list with real group list from features -->

<!-- To complete -->
<!-- Learn transitions in vue -->
<!-- Emits to know for 100% -->
