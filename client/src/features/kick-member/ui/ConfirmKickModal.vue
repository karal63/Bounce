<script setup lang="ts">
import DefaultModal from "@/shared/ui/DefaultModal.vue";
import { useKickMemberStore } from "../model/kickMemberStore";
import { useMemberStore } from "@/features/chat-members";
import { useKickMember } from "../model/useKickMember";
import Button from "@/shared/ui/Button/Button.vue";
import { getGroupById } from "@/shared/lib/helpers/getGroupById";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
const kickMemberStore = useKickMemberStore();
const memberStore = useMemberStore();
const currentChatStore = useCurrentChatStore();

const { kickMember } = useKickMember();
</script>

<template>
    <DefaultModal
        v-if="kickMemberStore.isConfirmModalOpen"
        event="Remove User from Group?"
        :storeState="kickMemberStore.isConfirmModalOpen"
        sizeX="400"
        sizeY="200"
        @closeModal="kickMemberStore.isConfirmModalOpen = false"
    >
        <div class="flex-col justify-between h-full">
            <div class="flex-col items-center">
                <p class="text-sm text-white/70 text-center max-w-[93%]">
                    Are you sure you want to remove
                    <span class="text-red-500">{{
                        memberStore.selectedMember?.name
                    }}</span>
                    from the group "<span class="text-white font-semibold">{{
                        getGroupById(
                            currentChatStore.groups,
                            memberStore.selectedMember?.groupId
                        )?.name
                    }}</span
                    >"? This action cannot be undone.
                </p>
            </div>

            <div class="flex justify-between items-center">
                <button
                    @click="kickMemberStore.isConfirmModalOpen = false"
                    class="cursor-pointer"
                >
                    Cancel
                </button>
                <Button
                    text="Remove"
                    color="red"
                    @callback="kickMember(memberStore.selectedMember?.id)"
                />
            </div>
        </div>
    </DefaultModal>
</template>
