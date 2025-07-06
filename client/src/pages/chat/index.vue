<script setup lang="ts">
import Sidebar from "@/widgets/sidebar/Sidebar.vue";
import MessageInputBlock from "@/features/send-messege/ui/index.vue";
</script>

<template>
    <div class="text-white flex h-full py-5">
        <Sidebar />
        <div class="relative ml-10">
            <!-- <MessageList /> -->
            <MessageInputBlock />
        </div>
        <!-- <MembersList /> -->
    </div>
</template>
