import { defineStore } from "pinia";
import { ref } from "vue";
import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const useChatStore = defineStore("chatStore", () => {
    const { socket } = useSocket();
    const currentChatStore = useCurrentChatStore();

    const isProfileContextOpen = ref(false);

    const getMembersList = () => {
        socket.emit("get-members-list", {
            room: currentChatStore.currentRoom,
            socketId: socket.id,
        });
    };

    return { isProfileContextOpen, getMembersList };
});
