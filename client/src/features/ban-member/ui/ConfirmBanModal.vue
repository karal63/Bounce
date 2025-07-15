<script setup lang="ts">
import DefaultModal from "@/shared/ui/DefaultModal.vue";
import { useBanMemberStore } from "../model/banMemberStore";
import { useMemberStore } from "@/features/chat-members";
import DeleteButton from "@/shared/ui/DeleteButton.vue";
import { useBanMember } from "../model/useBanMember";
import ModalInput from "@/shared/ui/ModalInput.vue";
import { ref } from "vue";

const badMemberStore = useBanMemberStore();
const memberStore = useMemberStore();
const { banMember } = useBanMember();

const banReason = ref("");
</script>

<template>
    <DefaultModal
        v-if="badMemberStore.isConfirmModalOpen"
        event="Ban User from Group?"
        :storeState="badMemberStore.isConfirmModalOpen"
        sizeX="400"
        sizeY="300"
        @closeModal="badMemberStore.isConfirmModalOpen = false"
    >
        <div class="flex-col justify-between h-full">
            <div class="flex-col items-center">
                <p class="text-sm text-white/70 text-center max-w-[93%]">
                    Are you sure you want to ban
                    <span class="text-red-500">{{
                        memberStore.selectedMember?.name
                    }}</span>
                    from this group?
                </p>

                <div class="mt-5 max-w-[93%]">
                    <p class="ml-3 text-sm text-white/70">
                        Desctibe the reason:
                    </p>
                    <ModalInput v-model="banReason" class="mt-1" />
                </div>
            </div>

            <div class="flex justify-between items-center">
                <button
                    @click="badMemberStore.isConfirmModalOpen = false"
                    class="cursor-pointer"
                >
                    Cancel
                </button>
                <DeleteButton
                    text="Ban"
                    @callback="
                        banMember(memberStore.selectedMember?.id, banReason)
                    "
                />
            </div>
        </div>
    </DefaultModal>
</template>
