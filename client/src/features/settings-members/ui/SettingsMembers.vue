<script setup lang="ts">
import type { MemberWithName } from "@/shared/types/Member";
import type { Context } from "@/shared/types/Context";
import { onMounted, ref } from "vue";
import { useGetBannedUsers } from "../model/useGetBannedUsers";
import SingleUser from "./SingleUser.vue";
import UserContext from "./UserContext.vue";
import Button from "@/shared/ui/Button.vue";
import { useSettingsMembersStore } from "../model/store";

const { getBannedUsers } = useGetBannedUsers();
const settingsMembersStore = useSettingsMembersStore();

const isBlockedList = ref(false);
const bannedUserContext = ref<Context<MemberWithName>>({
    user: null,
    isVisible: false,
    posX: 0,
    posY: 0,
});

const setContext = ({
    user,
    event,
}: {
    user: MemberWithName;
    event: MouseEvent;
}) => {
    bannedUserContext.value = {
        user,
        isVisible: !bannedUserContext.value.isVisible,
        posX: event.clientX,
        posY: event.clientY,
    };
};

onMounted(async () => {
    settingsMembersStore.bannedUsers = await getBannedUsers();
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
                <thead>
                    <tr class="border-b border-b-mainBorder text-secondary">
                        <td class="w-[30%] pb-2">Profile</td>
                        <td class="pb-2">Joined at</td>
                        <td class="pb-2">Ban message</td>
                    </tr>
                </thead>

                <tbody>
                    <SingleUser
                        v-for="bannedUser of settingsMembersStore.bannedUsers"
                        @setContext="setContext"
                        :bannedUser="bannedUser"
                    />
                </tbody>
            </table>

            <UserContext
                :context="bannedUserContext"
                @closeContext="bannedUserContext.isVisible = false"
            />
        </div>
    </div>
</template>
