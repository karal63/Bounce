import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Button from "./Button.vue";

const meta = {
    component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (args) => ({
        components: { Button },
        setup() {
            return { args };
        },
        template: '<Button v-bind="args" />',
    }),
    args: {
        color: "purple",
        text: "Save",
    },
};

export const PrimaryDelete: Story = {
    render: (args) => ({
        components: { Button },
        setup() {
            return { args };
        },
        template: '<Button v-bind="args" />',
    }),
    args: {
        color: "red",
        text: "Delete",
    },
};
