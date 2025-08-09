import type { MessageWithName } from "@/shared/types/Message";

export type ReactionContext = {
    isVisible: boolean;
    posX: number;
    posY: number;
    message: MessageWithName | null;
};
