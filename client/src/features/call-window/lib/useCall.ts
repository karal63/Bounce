import { useInclomingCallStore } from "@/features/incoming-call-window/@";
import { useSocket } from "@/shared/config/useSocketStore";
import type { Ref } from "vue";
import { useCallStore } from "../@";

const servers = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

export const useCall = () => {
    const { socket } = useSocket();
    const incomingCallStore = useInclomingCallStore();
    const callStore = useCallStore();

    const startLocalStream = async (
        localStream: Ref<MediaStream | null>,
        localVideo: Ref<HTMLVideoElement | null>
    ) => {
        localStream.value = await navigator.mediaDevices.getUserMedia({
            video:
                incomingCallStore.incomingCall.type === "video" ||
                callStore.call.type === "video",
            audio: true,
        });

        if (localVideo.value) {
            localVideo.value.srcObject = localStream.value;
        }

        // if (remoteVoice.value) {
        //     remoteVoice.value.srcObject = localStream.value;
        // }
    };

    const createPeerConnection = async (
        pc: Ref<RTCPeerConnection | null>,
        remoteVideo: Ref<HTMLVideoElement | null>,
        localStream: Ref<MediaStream | null>,
        remoteVoice: Ref<HTMLAudioElement | null>
    ) => {
        pc.value = new RTCPeerConnection(servers);

        pc.value.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit("webrtc:candidate", {
                    candidate: event.candidate,
                    to: callStore.call.to,
                });
            }
        };

        pc.value.ontrack = (event) => {
            if (remoteVideo.value) {
                remoteVideo.value.srcObject = event.streams[0];
            }
            if (remoteVoice.value) {
                remoteVoice.value.srcObject = event.streams[0];
            }
        };

        if (localStream.value) {
            localStream.value
                .getTracks()
                .forEach((t) => pc.value?.addTrack(t, localStream.value!));
        }
    };

    const endCall = (
        pc: Ref<RTCPeerConnection | null>,
        localStream: Ref<MediaStream | null>,
        localVideo: Ref<HTMLVideoElement | null>,
        remoteVoice: Ref<HTMLAudioElement | null>,
        remoteVideo: Ref<HTMLVideoElement | null>,
        pendingCandidates: Ref<RTCIceCandidateInit[]>
    ) => {
        if (!localStream.value) return;
        console.log("clean up media states");
        localStream.value.getTracks().forEach((track) => track.stop());

        pc.value?.close();
        pc.value = null;

        if (remoteVideo.value) {
            remoteVideo.value.srcObject = null;
            localVideo.value = null;
        }

        if (remoteVoice.value) {
            remoteVoice.value.srcObject = null;
            remoteVoice.value = null;
        }

        pendingCandidates.value = [];
    };

    return { startLocalStream, endCall, createPeerConnection };
};
