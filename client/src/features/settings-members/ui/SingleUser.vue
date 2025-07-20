<script setup lang="ts">
import { useHover } from "@/shared/lib/hooks/useHover";
import type { MemberWithName } from "@/shared/types/Member";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

defineProps<{
    bannedUser: MemberWithName;
}>();
const emit = defineEmits<{
    (e: "setContext", payload: { event: MouseEvent }): void;
}>();

const userRef = ref<HTMLElement | null>(null);
const isHovering = ref(false);

useHover(
    userRef,
    () => (isHovering.value = true),
    () => (isHovering.value = false)
);
</script>

<template>
    <tr ref="userRef" class="relative">
        <td class="py-3 flex items-center gap-2">
            <UserAvatar size="40" alt="userAvatar" />
            {{ bannedUser.name }}
        </td>
        <td class="py-3">{{ bannedUser.joinedAt }}</td>
        <td class="py-3">{{ bannedUser.banReason }}</td>

        <button
            v-if="isHovering"
            @click="(e) => emit('setContext', { event: e })"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 w-7 h-7 flex-center rounded-md bg-mainGray border border-mainBorder cursor-pointer hover:bg-mainHoverOnGray transition-all"
        >
            <Icon icon="pepicons-pencil:dots-y" class="text-lg" />
        </button>
    </tr>
</template>
