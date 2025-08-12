import { createPinia, setActivePinia } from "pinia";
import { useUploadAvatar } from "../useUploadAvatar";
import { useUploadImage } from "@/shared/lib/hooks/useUploadImage";
import { useSessionStore } from "@/shared/session/model/sessionStore";

vi.mock("@/shared/lib/hooks/useUploadImage", () => ({
    useUploadImage: () => ({
        uploadImage: vi.fn(() =>
            Promise.resolve({
                id: "mockedId",
                url: "https://mock/123",
            })
        ),
        loading: false,
    }),
}));

vi.mock("@/shared/api/user/updateUser", () => ({
    apiUpdateUser: vi.fn(() =>
        Promise.resolve({
            data: { id: "user1", avatarUrl: "https://mock/123" },
        })
    ),
}));

describe("useUploadAvatar", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
        const sessionStore = useSessionStore();
        sessionStore.user = {
            id: "user1",
            avatarUrl: "mockedAvatarUrl",
        } as any;
    });

    it("uploads avatar and updates sessionStore.user", async () => {
        const sessionStore = useSessionStore();
        const { uploadAvatar } = useUploadAvatar();

        const file = new File(["test"], "avatar.png", { type: "image/png" });
        await uploadAvatar(file);

        expect(sessionStore.user?.avatarUrl).toBe("https://mock/123");
    });

    // it("check if avatar updates on user object", async () => {});
});
