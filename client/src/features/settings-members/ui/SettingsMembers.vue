<script setup lang="ts">
import type { MemberWithName } from "@/shared/types/Member";
import Button from "@/shared/ui/Button.vue";
import { onMounted, ref } from "vue";
import { useGetBannedUsers } from "../model/useGetBannedUsers";
import SingleUser from "./SingleUser.vue";
import type { Context } from "@/shared/types/Context";
import UserContext from "./UserContext.vue";

const { getBannedUsers } = useGetBannedUsers();

const bannedUsers = ref<MemberWithName[] | undefined>([]);
const isBlockedList = ref(false);
const bannedUserContext = ref<Context>({
    isVisible: false,
    posX: 0,
    posY: 0,
});

const setContext = ({ event }: { event: MouseEvent }) => {
    bannedUserContext.value = {
        isVisible: !bannedUserContext.value.isVisible,
        posX: event.clientX,
        posY: event.clientY,
    };
    console.log(bannedUserContext.value);
};

onMounted(async () => {
    bannedUsers.value = await getBannedUsers();
});
</script>

<template>
    <div class="mt-5">
        <div
            class="border border-yellow-400 rounded-xl py-4 px-4 flex justify-between"
        >
            <h2 class="text-xl">Blocked users</h2>
            <Button
                v-if="!isBlockedList"
                text="Show"
                color="purple"
                @callback="isBlockedList = true"
            />
            <Button
                v-else
                text="Hide"
                color="purple"
                @callback="isBlockedList = false"
            />
        </div>

        <div v-if="isBlockedList">
            <h2 class="text-3xl mb-4 mt-4">Blocked users</h2>

            <table class="w-full">
                <tr class="border-b border-b-mainBorder text-secondary">
                    <td class="w-[30%] pb-2">Profile</td>
                    <td class="pb-2">Joined at</td>
                    <td class="pb-2">Ban message</td>
                </tr>

                <SingleUser
                    v-for="bannedUser of bannedUsers"
                    @setContext="setContext"
                    :bannedUser="bannedUser"
                />
            </table>
        </div>
    </div>
</template>

<!-- set proper position for context -->
