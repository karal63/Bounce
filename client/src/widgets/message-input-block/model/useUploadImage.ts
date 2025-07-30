import { apiUploadImage } from "../api/uploadImage";

export const useUploadImage = () => {
    const uploadImage = async (file: File | undefined) => {
        try {
            if (!file) return;
            console.log(file);

            const formData = new FormData();
            formData.append("image", file);

            const res = await apiUploadImage(formData);
            console.log("added: ", res);
        } catch (error) {
            console.log(error);
        }
    };

    return { uploadImage };
};
