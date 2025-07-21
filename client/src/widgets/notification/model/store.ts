import { defineStore } from "pinia";
import { ref } from "vue";

type Notification = {
    isVisible: boolean;
    senderId: number | null | undefined;
    message: string;
};

export const useNotificationStore = defineStore("notificationStore", () => {
    const notification = ref<Notification>({
        isVisible: false,
        senderId: null,
        message: "",
    });

    return { notification };
});
