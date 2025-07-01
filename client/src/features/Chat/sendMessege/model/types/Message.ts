export type ReadyMessage = {
    groupId: string;
    senderId?: string;
    content: string;
};

export type Message = {
    id: number;
    groupId: string;
    senderId?: string;
    content: string;
    sentAt: Date;
    editedAt: Date | null;
    isDeleted: boolean;
};
