<script setup lang="ts">
import type { MemberWithName } from "@/shared/types/Member";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { useMemberStore } from "../model/memberStore";
import type { Context } from "@/shared/types/Context";

const memberStore = useMemberStore();

const props = defineProps<{
    member: MemberWithName;
    membersListRef: HTMLElement | null;
}>();
const emit = defineEmits<{
    (event: "openContext"): void;
    (e: "setContext", value: Context<MemberWithName>): void;
}>();

const showProfile = (e: MouseEvent) => {
    const listRefRect = props.membersListRef?.getBoundingClientRect();

    if (!listRefRect) return;
    emit("setContext", {
        isVisible: true,
        posX: e.clientX - listRefRect.left,
        posY: e.clientY - listRefRect?.top,
        user: props.member,
        type: "profile",
    });
    memberStore.selectedMember = props.member;
};

const showActions = (e: MouseEvent) => {
    const listRefRect = props.membersListRef?.getBoundingClientRect();

    if (!listRefRect) return;
    emit("setContext", {
        isVisible: true,
        posX: e.clientX - listRefRect.left,
        posY: e.clientY - listRefRect?.top,
        user: props.member,
        type: "actions",
    });
    memberStore.selectedMember = props.member;
};
</script>

<template>
    <li
        @click="showProfile"
        @contextmenu.prevent="showActions"
        class="py-1 px-1 flex items-center justify-between gap-2 hover:bg-mainHoverOnGray rounded-xl cursor-pointer transition-all"
    >
        <div class="flex items-center gap-2">
            <UserAvatar size="40" />
            <div>
                <h3 class="text-lg">{{ member.name }}</h3>
            </div>
        </div>

        <div class="text-sm bg-mainGray text-purple-700 px-2 rounded-md">
            {{ member.role }}
        </div>
    </li>
</template>
