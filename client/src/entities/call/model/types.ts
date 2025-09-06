export type Call = {
    from: string | null | undefined;
    to: string | null;
    isCalling: boolean;
    isMuted: boolean;
    type: "voice" | "video";
    durationSec: number;
};

export type IncomingCall = {
    isCalling: boolean;
    callingUserId: string | null;
    type: "voice" | "video";
};
