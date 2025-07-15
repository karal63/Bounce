<script setup lang="ts">
import type { Context } from "@/shared/types/Context";
import { useMemberStore } from "../model/memberStore";
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import { onMounted, ref } from "vue";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { getPermissions } from "@/shared/lib/helpers/getPermissions";
import { useKickMemberStore } from "@/features/kick-member";

defineProps<{
    memberContext: Context;
}>();
const emit = defineEmits<{
    (event: "closeContext"): void;
}>();

const memberStore = useMemberStore();
const sessionStore = useSessionStore();
const currentChatStore = useCurrentChatStore();
const kickMemberStore = useKickMemberStore();

const contextRef = ref<HTMLElement | null>(null);
const permissions = ref({
    canDelete: false,
});

useClickOutside(contextRef, () => emit("closeContext"));

onMounted(() => {
    if (!sessionStore.user?.id || !memberStore.selectedMember?.id) return;
    permissions.value = getPermissions(
        sessionStore.user?.id,
        memberStore.selectedMember?.userId,
        currentChatStore.members
    );
});

const kick = () => {
    kickMemberStore.isConfirmModalOpen = true;
};
</script>

<template>
    <div
        ref="contextRef"
        class="absolute w-[100px] bg-mainGray p-1 rounded-md border border-mainHoverOnGray flex-col gap-1"
        :style="{
            left: `calc(${memberContext.posX}px - 60%)`,
            top: `calc(${memberContext.posY}px - 20%)`,
        }"
    >
        <button
            class="w-full text-left px-1 py-1 cursor-pointer hover:bg-mainHoverOnGray rounded-md"
        >
            Message
        </button>
        <button
            v-if="permissions.canDelete"
            @click="kick"
            class="w-full text-left px-1 py-1 cursor-pointer text-red-500 hover:bg-mainHoverOnGray rounded-md"
        >
            Kick
        </button>
        <button
            v-if="permissions.canDelete"
            class="w-full text-left px-1 py-1 cursor-pointer text-red-500 hover:bg-mainHoverOnGray rounded-md"
        >
            Ban
        </button>
    </div>
</template>
