export type Context<T = {}> = {
    user?: T | null;
    isVisible: boolean;
    posX?: number;
    posY?: number;
};
