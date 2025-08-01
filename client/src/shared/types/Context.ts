import type { MessageWithName } from "./Message";

export type Context<T = {}> = {
    isVisible: boolean;
    posX?: number;
    posY?: number;
    user?: T | null;
    message?: MessageWithName | null;
    type?: "actions" | "profile" | null;
};
