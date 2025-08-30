import { useSocket } from "@/shared/config/useSocketStore";
import { useCallStore } from "../@";
import { ref } from "vue";

export const useCall = () => {
    console.log("useCall called");
    const { socket } = useSocket();
    const callStore = useCallStore();

    const localVideo = ref<HTMLVideoElement | null>(null);
    const remoteVideo = ref<HTMLVideoElement | null>(null);

    const startLocalStream = async () => {
        console.log(localVideo.value);

        callStore.localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        if (!localVideo.value) return;
        localVideo.value.srcObject = callStore.localStream;
    };

    const createPeerConnection = () => {
        callStore.pc = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        callStore.pc.onicecandidate = (event) => {
            console.log("new candidate");
            if (event.candidate) {
                socket.emit("candidate", { candidate: event.candidate });
            }
        };

        callStore.pc.ontrack = (event) => {
            console.log("new video");
            if (remoteVideo.value) {
                remoteVideo.value.srcObject = event.streams[0];
            }
        };

        return callStore.pc;
    };

    const callUser = async () => {
        createPeerConnection();

        if (callStore.localStream) {
            callStore.localStream
                .getTracks()
                .forEach((t) =>
                    callStore.pc?.addTrack(t, callStore.localStream!)
                );
        }

        const offer = await callStore.pc?.createOffer();
        await callStore.pc?.setLocalDescription(offer);
        console.log(callStore.pc?.localDescription);

        socket.emit("offer", { offer });
        console.log("calling");
    };

    const handleOffer = async (offer: RTCSessionDescriptionInit) => {
        createPeerConnection();

        if (callStore.localStream) {
            callStore.localStream
                .getTracks()
                .forEach((t) =>
                    callStore.pc?.addTrack(t, callStore.localStream!)
                );
        }

        await callStore.pc?.setRemoteDescription(
            new RTCSessionDescription(offer)
        );

        const answer = await callStore.pc?.createAnswer();
        await callStore.pc?.setLocalDescription(answer);

        socket.emit("answer", { answer });

        for (const c of callStore.pendingCandidates) {
            await callStore.pc!.addIceCandidate(new RTCIceCandidate(c));
        }
        callStore.pendingCandidates.length = 0;
    };

    const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
        await callStore.pc?.setRemoteDescription(
            new RTCSessionDescription(answer)
        );

        for (const c of callStore.pendingCandidates) {
            await callStore.pc?.addIceCandidate(new RTCIceCandidate(c));
        }
        callStore.pendingCandidates.length = 0;
    };

    const handleCandidate = async (candidate: RTCIceCandidateInit) => {
        if (!callStore.pc) return;
        if (callStore.pc.remoteDescription) {
            await callStore.pc.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
            callStore.pendingCandidates.push(candidate);
        }
    };

    return {
        startLocalStream,
        callUser,
        handleOffer,
        handleAnswer,
        handleCandidate,
        localVideo,
        remoteVideo,
    };
};
