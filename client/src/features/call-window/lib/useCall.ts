import type { Ref } from "vue";

export const useCall = () => {
    const startLocalStream = async (
        localStream: Ref<MediaStream | null>,
        localVideo: Ref<HTMLVideoElement | null>
    ) => {
        localStream.value = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        if (!localVideo.value) return;
        localVideo.value.srcObject = localStream.value;
    };

    const endCall = (
        pc: Ref<RTCPeerConnection | null>,
        localStream: Ref<MediaStream | null>,
        localVideo: Ref<HTMLVideoElement | null>,
        remoteVideo: Ref<HTMLVideoElement | null>,
        pendingCandidates: Ref<RTCIceCandidateInit[]>
    ) => {
        if (!localStream.value || !remoteVideo.value) return;
        localStream.value.getTracks().forEach((track) => track.stop());
        pc.value?.close();
        pc.value = null;
        localVideo.value = null;
        remoteVideo.value.srcObject = null;
        pendingCandidates.value = [];
    };

    return { startLocalStream, endCall };
};
