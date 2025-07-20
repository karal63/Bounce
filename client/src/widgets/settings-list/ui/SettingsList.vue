<script setup lang="ts">
import { SettingsGeneral } from "@/features/settings-general";
import { SettingsMembers } from "@/features/settings-members";
import { ref } from "vue";

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
            <component
                :is="selected === 'General' ? SettingsGeneral : SettingsMembers"
            />
        </div>
    </div>
</template>
