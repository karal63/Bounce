import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";

vi.mock("vue-router", () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

import { useReplyToMessageStore } from "@/shared/model/replyToMessageStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

import MessagesList from "@/features/chat-messages/ui/MessagesList.vue";
import SingleMessage from "@/features/chat-messages/ui/SingleMessage.vue";
import { MessageInputBlock } from "../..";

vi.mock("@/features/reaction", () => ({
    useReaction: () => ({
        addReaction: vi.fn(),
        handleClick: vi.fn(),
        getAllReactions: vi.fn(() => Promise.resolve({ data: ["reaction"] })),
    }),
}));

describe("ReplyBar", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("shows reply button when hovering", async () => {
        const currentChatStore = useCurrentChatStore();
        const replyToMessageStore = useReplyToMessageStore();

        currentChatStore.currentRoom = { id: "mocked", type: "group" };
        currentChatStore.messages = [
            {
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
        ];

        const wrapper = mount(MessagesList);

        await wrapper.vm.$nextTick();

        const singleMessageWrapper = wrapper.findComponent(SingleMessage);

        // test: checking if single message exists
        expect(singleMessageWrapper.exists()).toBe(true);

        await wrapper.vm.$nextTick();
        const replyButton = singleMessageWrapper.find(
            '[data-testid="reply-button"]'
        );
        await replyButton.trigger("click");

        // test: checking if button appeared when hovered message
        expect(wrapper.find('[data-testid="reply-button"]').exists()).toBe(
            true
        );

        const inputWrapper = mount(MessageInputBlock);

        // test: checking if reply panel ui is open
        expect(inputWrapper.find('[data-testid="reply-name"]').text()).toBe(
            "mocked_userName"
        );

        // test: checking if reply panel state is true
        expect(replyToMessageStore.isReplyig).toBe(true);
    });
});
