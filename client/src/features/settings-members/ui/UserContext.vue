<script setup lang="ts">
import type { Context } from "@/shared/types/Context";
import type { MemberWithName } from "@/shared/types/Member";
import { useUnbanUser } from "../model/useUnbanUser";
import { ContextButton, ContextMenu } from "@/shared/ui";

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
        <ContextButton @unban="unban" :important="true"> Unban </ContextButton>
    </ContextMenu>
</template>
