<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
    <div
        class="border border-mainBorder shadow-purple-400 shadow-xl px-4 py-2 rounded-xl flex justify-between items-center hover:bg-mainHoverDarkBg transition-all cursor-pointer"
    >
        <div class="flex items-center gap-4">
            <div>
                <div class="w-10 h-10 rounded-full bg-purple-600"></div>
            </div>
            <div>
                <h4>yourName</h4>
                <div class="mt-1">
                    <span class="text-sm pr-1">🟢</span>Active
                </div>
            </div>
        </div>

        <Icon icon="pepicons-pencil:dots-y" class="text-lg" />
    </div>
</template>
