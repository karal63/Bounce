import { type Meta, type StoryObj } from "@storybook/vue3-vite";
import CallWindow from "./CallWindow.vue";
import { createPinia, setActivePinia } from "pinia";
import { useCallStore } from "../../@";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

const meta = {
    component: CallWindow,
} satisfies Meta<typeof CallWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (args) => ({
        components: { CallWindow },
        setup() {
            setActivePinia(createPinia());
            const callStore = useCallStore();
            const currentChatStore = useCurrentChatStore();

            callStore.call.isCalling = true;
            currentChatStore.currentRoom.type = "direct";

            return { args };
        },

        template: '<CallWindow v-bind="args" />',
    }),
};
