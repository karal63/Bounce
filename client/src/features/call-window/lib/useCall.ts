import { useSocket } from "@/shared/config/useSocketStore";
import { ref } from "vue";
import { useCallStore } from "../@";
import { useInclomingCallStore } from "@/features/incoming-call-window/model/incomingCallStore";

export const useCall = () => {
    const { socket } = useSocket();
    const callStore = useCallStore();
    const incomingCallStore = useInclomingCallStore();

    const localStream = ref<MediaStream | null>(null);
    const localVideo = ref<HTMLVideoElement | null>(null);
    const remoteVideo = ref<HTMLVideoElement | null>(null);
    const pc = ref<RTCPeerConnection | null>(null);
    const pendingCandidates = ref<RTCIceCandidateInit[]>([]);

    const startLocalStream = async () => {
        localStream.value = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        if (!localVideo.value) return;
        localVideo.value.srcObject = localStream.value;
    };

    const createPeerConnection = (to: string) => {
        pc.value = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        pc.value.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("webrtc:candidate", {
                    candidate: event.candidate,
                    to,
                });
            }
        };

        pc.value.ontrack = (event) => {
            if (remoteVideo.value) {
                remoteVideo.value.srcObject = event.streams[0];
            }
        };

        return pc;
    };

    const callUser = async (to: string) => {
        createPeerConnection(to);

        if (localStream.value) {
            localStream.value
                .getTracks()
                .forEach((t) => pc.value?.addTrack(t, localStream.value!));
        }

        const offer = await pc.value?.createOffer();
        await pc.value?.setLocalDescription(offer);

        socket.emit("webrtc:offer", { offer, to });
    };

    // this func sends immediately answer but i want user to decide accept the call or not
    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
        if (!incomingCallStore.incomingCall.callingUserId) return;
        createPeerConnection(incomingCallStore.incomingCall.callingUserId);

        if (localStream.value) {
            localStream.value
                .getTracks()
                .forEach((t) => pc.value?.addTrack(t, localStream.value!));
        }

        await pc.value?.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await pc.value?.createAnswer();
        await pc.value?.setLocalDescription(answer);

        socket.emit("webrtc:answer", {
            answer,
            to: incomingCallStore.incomingCall.callingUserId,
        });

        for (const c of pendingCandidates.value) {
            await pc!.value?.addIceCandidate(new RTCIceCandidate(c));
        }
        pendingCandidates.value.length = 0;
    };

    return {
        localStream,
        localVideo,
        remoteVideo,
        pc,
        createPeerConnection,
        startLocalStream,
        callUser,
        handleOffer,
    };
};
