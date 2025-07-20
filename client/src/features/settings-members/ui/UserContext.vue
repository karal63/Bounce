<script setup lang="ts">
import type { Context } from "@/shared/types/Context";
import type { MemberWithName } from "@/shared/types/Member";
import { useUnbanUser } from "../model/useUnbanUser";
import { ContextMenu } from "@/shared/ui";

const props = defineProps<{
    context: Context<MemberWithName>;
}>();
const emit = defineEmits<{
    (e: "closeContext"): void;
}>();

const { unbanUser } = useUnbanUser();

const unban = async () => {
    await unbanUser(props.context.user?.id);
    emit("closeContext");
};
</script>

<template>
    <ContextMenu
        v-if="context.isVisible"
        width="100"
        :left="context.posX"
        :top="context.posY"
        @closeContext="emit('closeContext')"
    >
        <button
            @click="unban"
            class="w-full text-left px-1 py-1 cursor-pointer text-red-500 hover:bg-mainHoverOnGray rounded-md"
        >
            Unban
        </button>
    </ContextMenu>
</template>
