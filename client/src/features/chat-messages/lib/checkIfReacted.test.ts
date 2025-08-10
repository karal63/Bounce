import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { createPinia, setActivePinia } from "pinia";

describe("checkIfReacted", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("check if reaction in reactions array", async () => {
        const currentChatStore = useCurrentChatStore();
        const reaction = { name: "reaction" };

        currentChatStore.reactions = [{ name: "reaction" } as any];

        expect(currentChatStore.reactions).toContainEqual(reaction);
    });
});
