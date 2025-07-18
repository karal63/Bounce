<script setup lang="ts">
import { SettingsGeneral } from "@/features/settings-general";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { ref } from "vue";

const currentChatStore = useCurrentChatStore();

const selected = ref("General");
</script>

<template>
    <div class="mt-10 w-[900px]">
        <ul class="flex">
            <li>
                <button
                    @click="selected = 'General'"
                    class="w-32 text-center border-b py-1 transition-all cursor-pointer"
                    :class="
                        selected === 'General'
                            ? 'border-purple-500'
                            : 'border-transparent'
                    "
                >
                    General
                </button>
            </li>
            <li>
                <button
                    @click="selected = 'Members'"
                    class="w-32 text-center border-b py-1 transition-all cursor-pointer"
                    :class="
                        selected === 'Members'
                            ? 'border-purple-500'
                            : 'border-transparent'
                    "
                >
                    Members
                </button>
            </li>
        </ul>

        <div class="mt-6">
            <component :is="selected === 'General' && SettingsGeneral" />
        </div>
    </div>
</template>
