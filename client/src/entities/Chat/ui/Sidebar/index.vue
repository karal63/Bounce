<script setup lang="ts">
import ProfileBar from "@/entities/Chat/ui/Sidebar/ProfileBar.vue";
import { Icon } from "@iconify/vue";
</script>

<template>
    <div class="min-w-[200px] max-w-[250px] h-full flex-col justify-between">
        <div>
            <!-- logo -->
            <div class="flex-col gap-1">
                <div class="bg-purple-500 w-6 h-2 rounded-xl -ml-1"></div>
                <div class="bg-purple-500 w-6 h-2 rounded-xl"></div>
                <div class="bg-purple-500 w-6 h-2 rounded-xl ml-1"></div>
            </div>

            <!-- chats -->
            <h1 class="text-3xl font-light mt-6">Chats</h1>
            <ul
                class="mt-5 bg-mainHoverDarkBg rounded-xl px-3 divide-y divide-mainBorder"
            >
                <li
                    class="py-3 cursor-pointer flex items-center gap-2 hover:text-purple-500 transition-all"
                >
                    <Icon
                        icon="lets-icons:chat-light"
                        class="text-3xl text-grayDull"
                    />Group_2ap
                </li>
                <li
                    class="py-3 cursor-pointer flex items-center gap-2 hover:text-purple-500 transition-all"
                >
                    <Icon
                        icon="lets-icons:chat-light"
                        class="text-3xl text-grayDull"
                    />My group
                </li>
                <li
                    class="py-3 cursor-pointer flex items-center gap-2 hover:text-purple-500 transition-all"
                >
                    <Icon
                        icon="lets-icons:chat-light"
                        class="text-3xl text-grayDull"
                    />Official Karal63's group
                </li>
            </ul>
        </div>

        <!-- menu context -->
        <ProfileBar />
    </div>
</template>
