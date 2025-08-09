import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { createPinia, setActivePinia } from "pinia";
import { useGetAttachments } from "./useGetAttachments";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import type { apiGetAttachments } from "@/shared/api";

vi.mock("@/shared/api", () => ({
    apiGetAttachments: vi.fn(() => Promise.resolve({ data: ["file1.png"] })),
}));

describe("useGetAttachments", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("loads attachments if there are current room and user id", async () => {
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

        const { getAttachments } = useGetAttachments();
        await getAttachments();

        expect(currentChatStore.attachments).toEqual(["file1.png"]);
    });
});
