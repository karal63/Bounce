<script setup lang="ts">
import { useSocket } from "@/shared/config/useSocketStore";
import { Icon } from "@iconify/vue";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { MemberWithName } from "@/entities/chat/model/types/Member";

const { socket } = useSocket();
const currentChatStore = useCurrentChatStore();

defineProps<{
    isMembersDropdown: boolean;
}>();

socket.on("members-list", (activeMembers: MemberWithName[]) => {
    currentChatStore.members = activeMembers;
});
</script>

<template>
    <ul
        class="absolute bg-grayDull w-full top-full rounded-md transition-all overflow-hidden divide-y divide-mainBorder/20 px-2"
        :class="isMembersDropdown ? 'h-[200px]' : 'h-0'"
    >
        <li
            v-for="member of currentChatStore.members"
            class="text-white h-13 px-2"
        >
            <div class="h-full flex items-center gap-3">
                <div
                    class="w-8 h-8 rounded-full bg-purple-400 flex-center text-lg"
                >
                    {{ member.name[0] }}
                </div>
                <div class="flex-col justify-center">
                    <h3 class="text-lg">{{ member.userId }}</h3>
                    <span class="text-[.7rem]">🟢 Active</span>
                </div>
                <button class="cursor-pointer">
                    <Icon icon="pepicons-pencil:dots-y" class="text-lg" />
                </button>
            </div>
        </li>
    </ul>
</template>
