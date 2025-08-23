import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Button from "./Button.vue";

const meta = {
    component: Button,
} satisfies Meta<typeof Button>;

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof meta>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
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
