import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notificationStore", () => {
    const notification = ref({
        isVisible: true,
        senderId: 31,
        message: "123 1231wad dqqwqwdq sdad asdqqeqwd qwda",
    });

    return { notification };
});
