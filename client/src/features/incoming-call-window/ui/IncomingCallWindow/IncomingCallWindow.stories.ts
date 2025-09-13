import { type Meta, type StoryObj } from "@storybook/vue3-vite";
import IncomingCallWindow from "./IncomingCallWindow.vue";
import { createPinia, setActivePinia } from "pinia";
import { useInclomingCallStore } from "../../model/incomingCallStore";

const meta = {
    component: IncomingCallWindow,
} satisfies Meta<typeof IncomingCallWindow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (args) => ({
        components: { IncomingCallWindow },
        setup() {
            setActivePinia(createPinia());
            const incomingCallStore = useInclomingCallStore();
            incomingCallStore.incomingCall.isCalling = true;
            return { args };
        },

        template: '<IncomingCallWindow v-bind="args" />',
    }),
};
