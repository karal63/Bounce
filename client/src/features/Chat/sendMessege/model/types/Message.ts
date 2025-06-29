export type Message = {
    sender?: string;
    content: string;
};

export type ReadyMessage = {
    sender?: string;
    content: string;
    sentAt: Date;
};
