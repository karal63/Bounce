// import { ref } from "vue";
// import { useCallStore } from "../@";

// const servers = {
//     iceServers: [
//         {
//             urls: [
//                 "stun:stun1.1.google.com:19302",
//                 "stun:stun2.1.google.com:19302",
//             ],
//         },
//     ],
// };

// export const useCall = () => {
//     const callStore = useCallStore();
//     const localVideo = ref<HTMLVideoElement | null>(null);
//     const remoteVideo = ref<HTMLVideoElement | null>(null);

//     let pc: RTCPeerConnection | null = null;

//     // the problem was that pc cant be in store or state
//     // now you can safely come back to previous commit and try to do something

//     const startLocalStream = async () => {
//         callStore.localStream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: true,
//         });
//         if (!localVideo.value) return;
//         localVideo.value.srcObject = callStore.localStream;
//         createOffer();
//     };

//     const createOffer = async () => {
//         pc = new RTCPeerConnection(servers);

//         callStore.remoteStream = new MediaStream();
//         if (remoteVideo.value)
//             remoteVideo.value.srcObject = callStore.remoteStream;

//         callStore.localStream
//             ?.getTracks()
//             .forEach((t) => pc?.addTrack(t, callStore.localStream!));

//         pc.ontrack = (event) => {
//             event.streams[0].getTracks().forEach((t) => {
//                 callStore.remoteStream?.addTrack(t);
//             });
//         };

//         pc.onicecandidate = async (event) => {
//             if (event.candidate) {
//                 console.log("new ice candidate", event.candidate);
//             }
//         };

//         const offer = await pc.createOffer();
//         console.log(offer);
//         await pc.setLocalDescription(offer);
//     };

//     return { createOffer, startLocalStream, localVideo, remoteVideo };
// };

// import { useSocket } from "@/shared/config/useSocketStore";
// import { useCallStore } from "../@";
// import { ref } from "vue";

// const servers = {
//     iceServers: [
//         {
//             urls: [
//                 "stun:stun1.1.google.com:19302",
//                 "stun:stun2.1.google.com:19302",
//             ],
//         },
//     ],
// };

// export const useCall = () => {
//     const { socket } = useSocket();
//     const callStore = useCallStore();

//     const localVideo = ref<HTMLVideoElement | null>(null);
//     const remoteVideo = ref<HTMLVideoElement | null>(null);
//     let pc: RTCPeerConnection | null = null;
//     const incomingOffer = ref();

//     const startLocalStream = async () => {
//         callStore.localStream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: true,
//         });
//         if (!localVideo.value) return;
//         localVideo.value.srcObject = callStore.localStream;
//     };

//     const createOffer = async () => {
//         console.log("=== creating offer === ");
//         pc = new RTCPeerConnection(servers);

//         pc.onicecandidate = (event) => {
//             console.log("new candidate");
//             if (event.candidate) {
//                 socket.emit("candidate", { candidate: event.candidate });
//             }
//         };

//         pc.ontrack = (event) => {
//             console.log("new video");
//             console.log(remoteVideo.value);
//             if (remoteVideo.value) {
//                 remoteVideo.value.srcObject = event.streams[0];
//             }
//         };

//         if (callStore.localStream) {
//             callStore.localStream
//                 .getTracks()
//                 .forEach((t) => pc?.addTrack(t, callStore.localStream!));
//         }

//         const offer = await pc?.createOffer();
//         await pc?.setLocalDescription(offer);

//         socket.emit("offer", { offer });
//         console.log("calling");
//     };

//     // this function fires immediately after requesting, this might cause the caller to not receive video
//     const handleOffer = async (offer: RTCSessionDescriptionInit) => {
//         pc = new RTCPeerConnection(servers);

//         pc.onicecandidate = (event) => {
//             console.log("new candidate");
//             if (event.candidate) {
//                 socket.emit("candidate", { candidate: event.candidate });
//             }
//         };

//         pc.ontrack = (event) => {
//             console.log("new video");
//             console.log(remoteVideo.value);

//             if (remoteVideo.value) {
//                 remoteVideo.value.srcObject = event.streams[0];
//             }
//         };

//         if (callStore.localStream) {
//             callStore.localStream
//                 .getTracks()
//                 .forEach((t) => pc?.addTrack(t, callStore.localStream!));
//         }

//         await pc?.setRemoteDescription(new RTCSessionDescription(offer));

//         const answer = await pc?.createAnswer();
//         await pc?.setLocalDescription(answer);

//         socket.emit("answer", { answer });

//         for (const c of callStore.pendingCandidates) {
//             await pc!.addIceCandidate(new RTCIceCandidate(c));
//         }
//         callStore.pendingCandidates.length = 0;
//     };

//     const acceptCall = async () => {};

//     const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
//         console.log("handle answer");
//         await pc?.setRemoteDescription(new RTCSessionDescription(answer));

//         for (const c of callStore.pendingCandidates) {
//             await pc?.addIceCandidate(new RTCIceCandidate(c));
//         }
//         callStore.pendingCandidates.length = 0;
//     };

//     const handleCandidate = async (candidate: RTCIceCandidateInit) => {
//         if (!pc) return;
//         if (pc.remoteDescription) {
//             await pc.addIceCandidate(new RTCIceCandidate(candidate));
//         } else {
//             callStore.pendingCandidates.push(candidate);
//         }
//     };

//     return {
//         startLocalStream,
//         handleOffer,
//         handleAnswer,
//         handleCandidate,
//         localVideo,
//         remoteVideo,
//         acceptCall,
//         createOffer,
//     };
// };
