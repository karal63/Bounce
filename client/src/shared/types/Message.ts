export type ReadyMessage = {
    groupId: number | null;
    senderId: number;
    content: string;
    mentionedUserId: number | null;
};

export type Message = {
    id: number;
    groupId: number | null;
    senderId?: number;
    content: string;
    sentAt: Date;
    editedAt: Date | null;
    isDeleted: boolean;
};

export type MessageWithName = Message & {
    name: string;
};
