import { axiosInstance, API_URL } from "@/shared/config/axiosInstance";

export const apiSendMessage = async (message) => {
    console.log(message);
    const res = await axiosInstance.post(`${API_URL}/send-message`, [message]);
    return res;
};
