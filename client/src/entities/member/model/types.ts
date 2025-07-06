export type Member = {
    id: number;
    groupId: number;
    userId: number;
    joinedAt: Date;
    role: "member" | "moderator" | "admin";
    isMuted: boolean;
    isBanned: boolean;
};

export type MemberWithName = Member & {
    name: string;
};
