<script setup lang="ts">
import type { Context } from "@/shared/types/Context";
import { useMemberStore } from "../model/memberStore";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import { ref } from "vue";
import UserAvatar from "@/shared/ui/UserAvatar.vue";

defineProps<{
    memberContext: Context;
}>();
const emit = defineEmits<{
    (event: "closeContext"): void;
}>();

const memberStore = useMemberStore();

const contextRef = ref<HTMLElement | null>(null);

useClickOutside(contextRef, () => emit("closeContext"));
</script>

<template>
    <div
        ref="contextRef"
        class="absolute w-[250px] bg-mainGray p-3 rounded-md border border-mainHoverOnGray flex-col"
        :style="{
            left: `calc(-115%)`,
            top: `${memberContext.posY}px`,
        }"
    >
        <div class="flex justify-between w-full">
            <UserAvatar size="48" />

            <div>
                <button
                    class="text-sm border border-purple-500 px-2 py-1 rounded-md cursor-pointer"
                >
                    Add friend
                </button>
            </div>
        </div>

        <div class="mt-2">
            <h2 class="text-lg font-semibold">
                {{ memberStore.selectedMember?.name }}
            </h2>
        </div>
    </div>
</template>
