<script setup lang="ts">
import { getGroupById } from "@/shared/lib/helpers/getGroupById";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import Button from "@/shared/ui/Button/Button.vue";
import Input from "@/shared/ui/Input.vue";
import { ref } from "vue";
import { useRenameGroup } from "../model/useRenameGroup";

const currentChatStore = useCurrentChatStore();
const { renameGroup } = useRenameGroup();

const groupName = ref<string | undefined>(
    getGroupById(currentChatStore.groups, currentChatStore.currentRoom.id)?.name
);

const saveNewGroupName = () => {
    if (
        !currentChatStore.currentRoom.id ||
        !groupName.value ||
        groupName.value ===
            getGroupById(
                currentChatStore.groups,
                currentChatStore.currentRoom.id
            )?.name
    )
        return;
    renameGroup(currentChatStore.currentRoom.id, groupName.value);
};
</script>

<template>
    <div>
        <div>
            <h2 class="text-3xl mb-4">Group</h2>

            <div class="flex items-center gap-3">
                <span>Group name</span>
                <Input v-model="groupName" x="200" y="41" />
                <Button
                    text="Save"
                    color="purple"
                    @callback="saveNewGroupName"
                />
            </div>
        </div>
    </div>
</template>
