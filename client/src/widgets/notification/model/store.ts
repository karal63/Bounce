import { defineStore } from "pinia";
import { ref } from "vue";

type Notification = {
    isVisible: boolean;
    senderId: string | null | undefined;
    name: string;
    senderAvatar: string;
    message: string;
};

export const useNotificationStore = defineStore("notificationStore", () => {
    const notification = ref<Notification>({
        isVisible: false,
        senderId: null,
        name: "",
        senderAvatar: "",
        message: "",
    });

    return { notification };
});
