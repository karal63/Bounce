import { type Meta, type StoryObj } from "@storybook/vue3-vite";
import Call from "./CallWindow.vue";

const meta = {
    component: Call,
    argTypes: {
        isVisible: {
            control: "boolean",
        },
    },
} satisfies Meta<typeof Call>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (args) => ({
        components: { Call },
        setup() {
            return { args };
        },

        template: '<Call v-bind="args" />',
    }),
    args: {
        isVisible: true,
    },
};
