import type { ReadyMessage } from "@/features/Chat/sendMessege/model/types/Message";
import { useSessionStore } from "@/shared/session/model/sessionStore";

export const checkPerson = (message: ReadyMessage) => {
    const sessionStore = useSessionStore();
    return sessionStore.user?.name === message.sender;
};
