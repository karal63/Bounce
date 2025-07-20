<script setup lang="ts">
import { useClickOutside } from "@/shared/lib/hooks/useClickOutside";
import type { Context } from "@/shared/types/Context";
import type { MemberWithName } from "@/shared/types/Member";
import { ref } from "vue";
import { useUnbanUser } from "../model/useUnbanUser";

const props = defineProps<{
    context: Context<MemberWithName>;
}>();
const emit = defineEmits<{
    (e: "closeContext"): void;
}>();

const { unbanUser } = useUnbanUser();

const contextRef = ref<HTMLElement | null>(null);

useClickOutside(contextRef, () => emit("closeContext"));

const unban = async () => {
    await unbanUser(props.context.user?.id);
};
</script>

<template>
    <div
        ref="contextRef"
        class="absolute w-[100px] bg-mainGray p-1 rounded-md border border-mainHoverOnGray flex-col gap-1"
        :style="{
            left: `${context.posX}px`,
            top: `calc(${context.posY}px - 50px)`,
        }"
    >
        <button
            @click="unban"
            class="w-full text-left px-1 py-1 cursor-pointer text-red-500 hover:bg-mainHoverOnGray rounded-md"
        >
            Unban
        </button>
    </div>
</template>
