import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { createPinia, setActivePinia } from "pinia";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useGetReactions } from "./useGetReactions";

vi.mock("@/shared/api", () => ({
    apiGetReactions: vi.fn(() => Promise.resolve({ data: ["reaction"] })),
}));

describe("useGetReactions", () => {
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

        const { getReactions } = useGetReactions();
        await getReactions();

        expect(currentChatStore.reactions).toEqual(["reaction"]);
    });
});
