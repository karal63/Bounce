export type Message = {
    senderId?: string;
    content: string;
};

export type ReadyMessage = {
    groupId: string;
    senderId?: string;
    content: string;
};
