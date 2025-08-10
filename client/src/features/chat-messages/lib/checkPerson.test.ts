import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { createPinia, setActivePinia } from "pinia";

describe("chat-messages/checkPerson", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("check if reaction in reactions array", async () => {
        const sessionStore = useSessionStore();

        sessionStore.user = {
            id: "userId",
        } as any;
        const message = { senderId: "userId" };

        expect(sessionStore.user?.id).toEqual(message.senderId);
    });
});
