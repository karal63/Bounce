vi.mock("vue-router", async (importOriginal) => {
    const actual = await importOriginal<typeof import("vue-router")>();

    return {
        ...actual,
        useRouter: () => ({
            ...actual.useRouter(),
            push: vi.fn(),
        }),
    };
});

vi.mock("socket.io-client", () => {
    const listeners: Record<string, Function[]> = {};

    const mockSocket = {
        on: vi.fn((event, callback) => {
            listeners[event] = listeners[event] || [];
            listeners[event].push(callback);
        }),
        off: vi.fn((event) => {
            delete listeners[event];
        }),
        emitEvent: vi.fn((event: string, data: any) => {
            (listeners[event] || []).forEach((cb) => cb(data));
        }),
    };

    return { io: vi.fn(() => mockSocket), mockSocket };
});

import { mount } from "@vue/test-utils";
import MessagesList from "../ui/MessagesList.vue";
import { createPinia, setActivePinia } from "pinia";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
// @ts-expect-error (optional: mock export)
import { mockSocket } from "socket.io-client";
import type { MessageWithName } from "@/shared/types/Message";
import type { Attachment } from "@/shared/types/Attachment";

vi.mock("@/features/reaction/api/getAllReactions", () => ({
    apiGetAllReactions: vi.fn().mockResolvedValue({
        data: [],
    }),
}));

describe("MessagesList", () => {
    beforeEach(async () => {
        vi.clearAllMocks();

        setActivePinia(createPinia());
        const currentChatStore = useCurrentChatStore();
        currentChatStore.messages = [
            {
                id: "mocked",
                content: "new message (mocked)",
                groupId: "mocked",
                senderId: "mocked",
                recipientId: null,
                sentAt: new Date(),
                editedAt: null,
                isDeleted: false,
                replyToMessageId: undefined,
                name: "mocked",
                avatarUrl: "mocked",
            },
        ];
        currentChatStore.currentRoom = {
            id: "mocked",
            type: "group",
        };
    });

    it("check if new message emit adds message", async () => {
        const currentChatStore = useCurrentChatStore();
        const wrapper = mount(MessagesList);

        mockSocket.on(
            "newMessage",
            ({
                newMessage,
            }: // attachments,
            {
                newMessage: MessageWithName;
                attachments?: Attachment[];
            }) => {
                currentChatStore.messages.push(newMessage);
            }
        );

        mockSocket.emitEvent("newMessage", {
            newMessage: {
                id: "mocked",
                content: "new message (mocked)",
                groupId: "mocked",
                senderId: "mocked",
                recipientId: null,
                sentAt: new Date(),
                editedAt: null,
                isDeleted: false,
                replyToMessageId: undefined,
                name: "mocked",
                avatarUrl: "mocked",
            },
            attachments: [],
        });

        expect(wrapper.find('[data-testid="single-message"]').text()).toBe(
            "new message (mocked)"
        );
    });
});
