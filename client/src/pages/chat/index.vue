<script setup lang="ts">
import Sidebar from "@/widgets/sidebar/Sidebar.vue";
import MessageInputBlock from "@/widgets/message-input-block/ui/index.vue";
</script>

<template>
    <div class="text-white flex h-full py-5">
        <Sidebar />
        <div class="relative ml-10 w-full">
            <!-- <MessageList /> -->
            <MessageInputBlock />
        </div>
        <!-- <MembersList /> -->
    </div>
</template>

<!-- // END POINT HERE -->
<!-- // 5. i think i should move input panel to widget -->
<!-- // 6. commit: 'refactor: move types to entities, change features folder structure' -->
<!-- // 7. Replace groups list with real group list from features -->
