<script setup lang="ts">
import DefaultModal from "@/shared/ui/DefaultModal.vue";
import { useBanReasonStore } from "../model/badReasonStore";
import { useSocket } from "@/shared/config/useSocketStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import Button from "@/shared/ui/Button.vue";

const banReasonStore = useBanReasonStore();
const sessionStore = useSessionStore();

const { socket } = useSocket();

socket.on("to-banned:update-groups", (bannedMember) => {
    banReasonStore.banReason = {
        isVisible: true,
        groupName: bannedMember.groupId,
        reason: bannedMember.banReason,
    };
    console.log("You are banned");
});
</script>

<template>
    <DefaultModal
        v-if="banReasonStore.banReason.isVisible"
        :event="`Hey ${sessionStore.user?.name}!`"
        :storeState="banReasonStore.banReason.isVisible"
        sizeX="400"
        sizeY="250"
        @closeModal="banReasonStore.banReason.isVisible = false"
    >
        <div class="flex-col justify-between h-full">
            <div class="flex-col items-center">
                <p class="text-sm text-white/70 text-center max-w-[93%]">
                    You have been banned from "{{
                        banReasonStore.banReason.groupName
                    }}" group.
                </p>

                <p class="mt-4 pl-4 text-sm text-white/70 w-full">Reason:</p>
                <p class="w-full mt-1 bg-mainHoverOnGray p-2 rounded-md">
                    {{ banReasonStore.banReason.reason }}
                </p>
            </div>

            <div class="flex justify-end items-center">
                <Button
                    text="Close"
                    color="purple"
                    @callback="
                        banReasonStore.banReason = {
                            isVisible: false,
                            groupName: '',
                            reason: '',
                        }
                    "
                />
            </div>
        </div>
    </DefaultModal>
</template>
