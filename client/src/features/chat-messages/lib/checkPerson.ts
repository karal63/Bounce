import { useSessionStore } from "@/shared/session/model/sessionStore";
import type { ReadyMessage } from "@/entities/message";

export const checkPerson = (message: ReadyMessage) => {
    const sessionStore = useSessionStore();
    return sessionStore.user?.id === message.senderId;
};
