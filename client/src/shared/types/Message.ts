import type { AttachmentToUpload } from "./Attachment";

export type ReadyMessage = {
    groupId?: string | null;
    recipientId?: string | null;
    senderId?: string;
    content: string;
    mentionedUsersId: (string | null)[];
    replyToMessageId: string | undefined;
    attachments: AttachmentToUpload[];
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
    replyToMessageId: string | undefined;
};

export type MessageWithName = Message & {
    name: string;
    avatarUrl: string;
};
