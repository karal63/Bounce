<script setup lang="ts">
import { getGroupById } from "@/shared/lib/helpers/getGroupById";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import Button from "@/shared/ui/Button.vue";
import Input from "@/shared/ui/Input.vue";
import { ref } from "vue";

const currentChatStore = useCurrentChatStore();

const groupName = ref<string | undefined>(
    getGroupById(currentChatStore.groups, currentChatStore.currentRoom)?.name
);

const saveNewGroupName = () => {
    console.log(groupName.value);
};

console.log(
    getGroupById(currentChatStore.groups, currentChatStore.currentRoom)?.name
);
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
