import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import { useSessionStore } from "@/shared/session/model/sessionStore";

let socket: Socket;

export function useSocket() {
    const sessionStore = useSessionStore();

    if (!socket) {
        socket = io("http://localhost:5000", {
            autoConnect: false,
            query: {
                username: sessionStore.user?.name,
            },
        });
    }

    const connectSocket = () => {
        if (socket && !socket.connected) {
            socket.io.opts.query = {
                username: sessionStore.user?.name,
            };
            socket.connect();
        }
    };

    const disconnectSocket = () => {
        if (socket && socket.connected) {
            socket.disconnect();
        }
    };

    return {
        socket,
        connectSocket,
        disconnectSocket,
    };
}
