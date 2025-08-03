import { defineStore } from "pinia";
import { ref } from "vue";

type Notification = {
    isVisible: boolean;
    senderId: string | null | undefined;
    senderAvatar: string;
    message: string;
};

export const useNotificationStore = defineStore("notificationStore", () => {
    const notification = ref<Notification>({
        isVisible: false,
        senderId: null,
        senderAvatar: "",
        message: "",
    });

    return { notification };
});
