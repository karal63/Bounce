export type ReadyMessage = {
    groupId?: string | null;
    recipientId?: string | null;
    senderId?: string;
    content: string;
    mentionedUsersId: (number | null)[];
};

export type Message = {
    id: string;
    groupId: string | null;
    recipientId: string | null;
    senderId?: string;
    content: string;
    sentAt: Date;
    editedAt: Date | null;
    isDeleted: boolean;
};

export type MessageWithName = Message & {
    name: string;
};
