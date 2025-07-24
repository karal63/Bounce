import { useSessionStore } from "@/shared/session/model/sessionStore";
import type { MessageWithName } from "@/shared/types/Message";

export const checkPerson = (message: MessageWithName) => {
    const sessionStore = useSessionStore();
    return sessionStore.user?.id === message.senderId;
};
