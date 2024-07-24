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
    let joinRoomCode: string | undefined;

    const { authUser, setRoomCode } = useAuthContext() as AuthContextType;

    const createSocketConnection = () => {
        socket = io('http://localhost:3000', {
            withCredentials: true // to pass cookies to socket
        });

        socket.on("connect_error", err => {
            if(err.message === 'xhr poll error'){
                const { dateString } = date();
                toast(`Failed to Create Room : Server Connection Error`, {
                    description: dateString
                });
                socket.disconnect();
            }
            const { dateString } = date();
            toast(`Failed to Create Room : ${err.message}`, {
                description: dateString
            });
        });
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
                    setRoomCode(res.secretcode);
                    joinRoomCode = res.secretcode;
                    resolve({ code: res.secretcode });
                }
            })
        })
    };

    const returnCode = () => {
        if (!socket) {
            return undefined;
        }
        return joinRoomCode;
    }

    return {
        createRoom,
        createSocketConnection,
        returnCode
    }
}

export {
    useSocket
}