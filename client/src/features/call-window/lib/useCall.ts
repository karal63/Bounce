import type { Ref } from "vue";

export const useCall = () => {
    const startLocalStream = async (
        localStream: MediaStream,
        localVideo: Ref<HTMLVideoElement>
    ) => {
        console.log(localStream, localVideo);
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        if (!localVideo.value) return;
        localVideo.value.srcObject = localStream;
    };

    return { startLocalStream };
};
