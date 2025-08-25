import type { Meta, StoryObj } from "@storybook/vue3-vite";

import NotificationWindow from "./NotificationWindow.vue";
import { createPinia, setActivePinia } from "pinia";
import { useNotificationStore } from "../model/store";
import { watch } from "vue";

const meta = {
    component: NotificationWindow,
} satisfies Meta<typeof NotificationWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (args) => ({
        components: { NotificationWindow },
        setup() {
            setActivePinia(createPinia());

            const notificationStore = useNotificationStore();
            notificationStore.$patch({
                notification: {
                    isVisible: true,
                    message:
                        "Hello World paalore adaoskda loremasd are asdasd cu eq 21 qdwqda dsasc",
                    name: "Leo",
                    senderAvatar: "",
                    senderId: "",
                },
            });

            return { args };
        },
        template: '<NotificationWindow v-bind="args" />',
    }),
};

// create boolean selector for show/hide notification
