<script setup lang="ts">
import type { Group } from "@/shared/types/Group";
import { Icon } from "@iconify/vue";

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
        <Icon icon="lets-icons:chat-light" class="text-3xl text-grayDull" />{{
            group.name
        }}
    </li>
</template>
