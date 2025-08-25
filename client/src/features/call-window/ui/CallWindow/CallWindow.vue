<script setup lang="ts">
import ModalTransition from "@/shared/ui/ModalTransition.vue";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { Icon } from "@iconify/vue";
import { useCallStore } from "../../model/callStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

const callStore = useCallStore();
const currentChatStore = useCurrentChatStore();
</script>

<template>
    <ModalTransition
        v-if="currentChatStore.currentRoom.type !== 'group'"
        v-show="callStore.call.isCalling"
    >
        <div
            class="absolute left-0 top-0 h-full w-full bg-mainGray/90 backdrop-blur-md"
        >
            <!-- if video show it -->
            <!-- <div class="h-full w-full"></div> -->

            <!-- else -->
            <div class="h-full flex-center">
                <div class="flex-col items-center">
                    <UserAvatar
                        size="125"
                        alt="user"
                        class="border-4 border-purple-500 drop-shadow-2xl drop-shadow-purple-900"
                    />
                    <p class="mt-5 text-green-400">Connecting...</p>
                </div>
            </div>

            <!-- buttons panel -->
            <div
                class="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-mainDarkBg/20 px-4 py-2 rounded-full flex items-center gap-4"
            >
                <button
                    @click="callStore.toggleMute"
                    class="w-13 h-13 rounded-full text-3xl flex-center cursor-pointer transition-all"
                    :class="
                        callStore.call.isMuted
                            ? 'bg-purple-500'
                            : 'hover:bg-mainHoverOnGray'
                    "
                >
                    <Icon icon="quill:mute" />
                </button>

                <button
                    @click="callStore.dropCall"
                    class="bg-red-500 w-13 h-13 rounded-full text-4xl flex-center cursor-pointer"
                >
                    <Icon icon="fluent:call-end-16-regular" />
                </button>
            </div>

            <!-- close call button -->
            <button
                @click="callStore.dropCall"
                class="absolute right-4 top-4 rounded-full text-3xl flex-center cursor-pointer"
            >
                <Icon icon="ic:round-close" />
            </button>
        </div>
    </ModalTransition>
</template>
