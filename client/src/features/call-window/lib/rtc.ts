// rtc.ts
import { useSocket } from "@/shared/config/useSocketStore";
import type { Ref } from "vue";
import { useCallStore } from "../@";

let pc: RTCPeerConnection | null = null;
const pendingCandidates: RTCIceCandidateInit[] = [];

function getOrCreatePeerConnection(): RTCPeerConnection {
    const { socket } = useSocket();
    const callStore = useCallStore();

    if (pc) return pc;

    pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onicecandidate = (event) => {
        if (event.candidate) {
            try {
                socket.emit("webrtc:candidate", { candidate: event.candidate });
            } catch (e) {
                console.error("[ICE] emit error", e);
            }
        }
    };

    pc.ontrack = (event) => {
        // ensure a MediaStream instance (some platforms send empty streams array)
        let remote = callStore.remoteStream;
        if (!remote) {
            remote = new MediaStream();
            callStore.remoteStream = remote;
        }
        for (const track of event.streams?.[0]?.getTracks?.() ??
        event.streams?.[0]
            ? []
            : [event.track]) {
            // above tries to support both "streams[0]" and single-track events
            if (!remote.getTracks().includes(track)) {
                remote.addTrack(track);
            }
        }
        // Fallback: if event.streams[0] exists, just take it
        if (event.streams && event.streams[0]) {
            callStore.remoteStream = event.streams[0];
        }
    };

    pc.onconnectionstatechange = () => {
        console.log("[PC] connectionState:", pc?.connectionState);
    };
    pc.oniceconnectionstatechange = () => {
        console.log("[PC] iceConnectionState:", pc?.iceConnectionState);
    };
    pc.onnegotiationneeded = async () => {
        try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            socket.emit("webrtc:offer", { offer });
        } catch (e) {
            console.error("Renegotiation failed:", e);
        }
    };

    return pc;
}

function attachLocalTracksIfAny() {
    const callStore = useCallStore();
    if (!pc || !callStore.localStream) return;

    const senders = pc.getSenders();
    for (const track of callStore.localStream.getTracks()) {
        const already = senders.find(
            (s) => s.track && s.track.kind === track.kind
        );
        if (already) {
            if (already.track !== track)
                already.replaceTrack(track).catch(console.warn);
        } else {
            pc.addTrack(track, callStore.localStream);
        }
    }
}

export async function startLocalStream(
    localVideo: Ref<HTMLVideoElement | null>
) {
    const callStore = useCallStore();

    // Request devices
    callStore.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });

    // Make autoplay work reliably
    const el = localVideo.value;
    if (el) {
        el.srcObject = callStore.localStream;
        el.muted = true; // critical for autoplay
        el.playsInline = true;
        try {
            await el.play();
        } catch (e) {
            /* user gesture may be needed; ignore */
        }
    }

    // If a PC exists already, attach tracks now
    getOrCreatePeerConnection();
    attachLocalTracksIfAny();
}

export async function startCall() {
    const { socket } = useSocket();

    getOrCreatePeerConnection();
    attachLocalTracksIfAny();

    if (!pc) throw new Error("PeerConnection not available");
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket.emit("webrtc:offer", { offer }); // include any routing/room info your signaling expects
}

export async function handleOffer(offer: RTCSessionDescriptionInit) {
    const { socket } = useSocket();
    const pc = getOrCreatePeerConnection();
    if (pc.signalingState !== "stable") {
        console.warn("Ignoring incoming offer, state=", pc.signalingState);
        return;
    }
    await pc.setRemoteDescription(offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.emit("webrtc:answer", { answer });
}

export async function handleAnswer(answer: RTCSessionDescriptionInit) {
    const callStore = useCallStore();
    console.log("got answer");

    if (!pc) throw new Error("PeerConnection not available");
    await pc.setRemoteDescription(answer);
    await flushPendingCandidates();
}

export async function handleCandidate(candidate: RTCIceCandidateInit) {
    // Buffer until a remote description is present
    if (pc && pc.remoteDescription) {
        try {
            await pc.addIceCandidate(candidate);
        } catch (e) {
            console.warn(
                "[ICE] addIceCandidate failed (applying directly). Buffer instead.",
                e
            );
            pendingCandidates.push(candidate);
        }
    } else {
        pendingCandidates.push(candidate);
    }
}

async function flushPendingCandidates() {
    if (!pc || !pc.remoteDescription) return;
    while (pendingCandidates.length) {
        const c = pendingCandidates.shift()!;
        try {
            await pc.addIceCandidate(c);
        } catch (e) {
            console.warn("[ICE] flushing candidate failed", e, c);
        }
    }
}

export function closePeerConnection() {
    const callStore = useCallStore();

    try {
        if (pc) {
            pc.getSenders().forEach((s) => {
                try {
                    s.track?.stop();
                } catch {}
            });
            pc.getReceivers().forEach((r) => {
                try {
                    r.track?.stop();
                } catch {}
            });
            pc.getTransceivers().forEach((t) => {
                try {
                    t.stop();
                } catch {}
            });
            pc.close();
        }
    } finally {
        pc = null;
        // Optional: stop local devices
        callStore.localStream?.getTracks()?.forEach((t) => t.stop());
        callStore.remoteStream = null as any;
        callStore.localStream = null as any;
        pendingCandidates.length = 0;
    }
}
