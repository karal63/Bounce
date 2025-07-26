export type Group = {
    id: string;
    name: string;
    ownerId: string;
    createdAt: Date;
    isPrivate: boolean;
    description: string;
    invitationLink: string;
};
