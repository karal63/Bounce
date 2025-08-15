import { apiSendGroupMessage } from "@/shared/api";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { createPinia, setActivePinia } from "pinia";

vi.mock("@/shared/api/message/sendGroupMessage", () => ({
    apiSendGroupMessage: vi.fn(() => ({})),
}));

vi.mock("@/shared/api/message/sendDirectMessage", () => ({
    apiSendDirectMessage: vi.fn(() => ({})),
}));

describe("useSendMessage", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("check if request to the server was made", async () => {
        const currentChatStore = useCurrentChatStore();
        currentChatStore.currentRoom = {
            id: "mocked_id",
            type: "group",
        };

        const message = {
            id: "mocked",
        };

        if (!currentChatStore.currentRoom.id) return;
        await apiSendGroupMessage(
            message as any,
            currentChatStore.currentRoom.id
        );

        expect(apiSendGroupMessage).toHaveBeenCalled();
    });
});
