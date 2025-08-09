import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { createPinia, setActivePinia } from "pinia";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useGetMessages } from "./useGetMessages";

vi.mock("@/shared/api", () => ({
    apiGetMessages: vi.fn(() => Promise.resolve({ data: ["message"] })),
}));

describe("useGetMessages", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("loads messaages if there are current room and user id", async () => {
        const currentChatStore = useCurrentChatStore();
        const sessionStore = useSessionStore();

        currentChatStore.currentRoom = {
            id: "roomId_1",
            type: "group",
        };
        sessionStore.user = {
            id: "userId_1",
            name: "userName",
            email: "userEmail",
            isActivated: false,
            avatarUrl: "avatarUrl",
        };

        const { getMessages } = useGetMessages();
        currentChatStore.messages = await getMessages();

        expect(currentChatStore.messages).toEqual(["message"]);
    });
});
