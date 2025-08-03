export type Member = {
    id: string;
    groupId: string;
    userId: string;
    joinedAt: Date;
    role: "member" | "moderator" | "admin";
    isMuted: boolean;
    isBanned: boolean;
    banReason: string;
};

export type MemberWithName = Member & {
    name: string;
    avatarUrl: string;
};
