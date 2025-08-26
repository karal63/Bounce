export type Call = {
    from: string | null | undefined;
    to: string | null;
    isCalling: boolean;
    isMuted: boolean;
};

export type IncomingCall = {
    isCalling: boolean;
    callingUserId: string | null;
};
