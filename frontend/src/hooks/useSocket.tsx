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

function useSocket() {
    const socket: Socket = io('http://localhost:3000');

    const { authUser } = useAuthContext() as AuthContextType;

    const createRoom = () => {
        if (authUser === undefined) {
            const { dateString } = date();
            toast(`Failed to Create Room : Login first`, {
                description: dateString
            });
        }
        else {
            socket.emit('create-room', authUser.username, authUser.profilePic, (res: response) => {
                if (res.error) {
                    const { dateString } = date();
                    toast(`Failed to Create Room : ${res.error}`, {
                        description: dateString
                    });
                }
                else {
                    const { dateString } = date();
                    console.log(res);
                    toast(`Room Code : ${res.secretcode}`, {
                        description: dateString
                    });
                }
            })
        }
    };

    return {
        createRoom
    }
}

export {
    useSocket
}