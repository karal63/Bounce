<script setup lang="ts">
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { Group } from "@/shared/types/Group";
import { Icon } from "@iconify/vue";
import { watchEffect } from "vue";

const currentChatStore = useCurrentChatStore();

const props = defineProps<{
    group: Group;
}>();
const emit = defineEmits<{
    (event: "setGroup"): void;
    (event: "setContextGroup", group: Group): void;
}>();
</script>

<template>
    <li
        @click="emit('setGroup')"
        @contextmenu="emit('setContextGroup', props.group)"
        class="py-3 cursor-pointer flex items-center gap-2 hover:text-purple-500 transition-all"
    >
        <Icon
            icon="lets-icons:chat-light"
            class="text-3xl"
            :class="
                currentChatStore.currentRoom === group.id
                    ? 'text-purple-500'
                    : 'text-grayDull'
            "
        />
        {{ group.name }}
    </li>
</template>
