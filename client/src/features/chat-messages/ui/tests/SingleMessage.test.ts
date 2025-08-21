import { createPinia, setActivePinia } from "pinia";
import SingleMessage from "../SingleMessage.vue";
import { mount } from "@vue/test-utils";

describe("SingleMessage", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("check if message exists", async () => {
        const wrapper = mount(SingleMessage, {
            props: {
                message: {
                    id: "mocked_id",
                    sentAt: new Date(),
                    editedAt: null,
                    content: "mocked_content",
                    groupId: "mocked_groupId",
                    recipientId: "mocked_recipientId",
                    senderId: "mocked_senderId",
                    avatarUrl: "mocked_id",
                    isDeleted: false,
                    name: "mocked_userName",
                    replyToMessageId: "mocked_messageId",
                },
                pos: null,
            },
        });
        expect(wrapper.find("[data-testid=single-message]").exists()).toBe(
            true
        );
    });
});
