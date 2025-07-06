import { axiosInstance, API_URL } from "@/shared/config/axiosInstance";
import type { ReadyMessage } from "@/entities/message/model/types";

export const apiSendMessage = async (message: ReadyMessage, room: number) => {
    const res = await axiosInstance.post(`${API_URL}/send-message`, {
        message,
        room,
    });
    return res;
};

// END POINT HERE
// 1. first of all move api somewhere (ask where because have no idea)
// 4. change to slice/model/types.ts in entity
// 5. i think i should move input panel to widget
// 6. commit: 'refactor: move types to entities, change features folder structure'
