export type Context<T = {}> = {
    isVisible: boolean;
    posX?: number;
    posY?: number;
    user?: T | null;
    type?: "actions" | "profile" | null;
};
