import { apiUpdateUser } from "@/shared/api/user/updateUser";
import { useUploadImage } from "@/shared/lib/hooks/useUploadImage";
import { useSessionStore } from "@/shared/session/model/sessionStore";

export const useUploadAvatar = () => {
    const sessionStore = useSessionStore();
    const { uploadImage, loading } = useUploadImage();

    const uploadAvatar = async (file: File) => {
        if (!sessionStore.user) return;
        const avatar = await uploadImage(file);
        const updatedUser = await apiUpdateUser({ avatarUrl: avatar.url });
        sessionStore.user = updatedUser.data;
        console.log(sessionStore.user);
    };

    return { uploadAvatar, loading };
};
