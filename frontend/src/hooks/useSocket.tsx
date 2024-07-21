// import { useCallback } from "react";
import { toast } from "sonner";
import { date } from "../utils/date.ts";
import { io, Socket } from 'socket.io-client';

import { useAuthContext, AuthContextType } from "../context/AuthContext";

type response = {
    error: string;
    creator?: undefined;
    secretcode?: undefined;
} | {
    creator: string;
    secretcode: string;
    error?: undefined;
}

export type roomCode = {
    error?: string;
    code?: string;
};

function useSocket() {
    let socket: Socket;

    const { authUser } = useAuthContext() as AuthContextType;

    const createSocketConnection = () => {
        socket = io('http://localhost:3000');
    }

    const createRoom = (): Promise<roomCode> => {
        return new Promise((resolve) => {
            if (!socket) {
                resolve({ error: "No socket conncetion" });
                return;
            }
    
            if (authUser === undefined) {
                const { dateString } = date();
                toast(`Failed to Create Room : Login first`, {
                    description: dateString
                });
                resolve({ error: "No Auth User" });
                return;
            }

            socket.emit('create-room', authUser.username, authUser.profilePic, (res: response) => {
                if (res.error) {
                    const { dateString } = date();
                    toast(`Failed to Create Room : ${res.error}`, {
                        description: dateString
                    });
                    resolve({ error: res.error });
                }
                else {
                    const { dateString } = date();
                    toast(`Room Code : ${res.secretcode}`, {
                        description: dateString
                    });
                    resolve({ code: res.secretcode });
                }
            })
        })
    };

    return {
        createRoom,
        createSocketConnection
    }
}

export {
    useSocket
}