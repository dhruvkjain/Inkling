// import { useCallback } from "react";
import { toast } from "sonner";
import { date } from "../utils/date.ts";
import { io, Socket } from 'socket.io-client';

import { useAuthContext, AuthContextType } from "../context/AuthContext";
import { gameResponse, useGameContext, GameContextType } from "../context/GameContext.tsx";

export type roomCode = {
    error?: string;
    code?: string;
};

export type generateWord = {
    error?: string;
}

function useSocket() {
    let socket: Socket;
    let joinRoomCode: string | undefined;

    const { authUser } = useAuthContext() as AuthContextType;
    const { setGameDetails, setOpenDialog, setWords } = useGameContext() as GameContextType;

    const createSocketConnection = () => {
        socket = io('http://localhost:3000', {
            withCredentials: true // to pass cookies to socket
        });

        socket.on("select-word", gameData => {
            setWords(gameData);
            setOpenDialog(true);
        })

        socket.on("update-gameDetails", gameData => {
            setGameDetails(gameData);
        })

        socket.on("notification", message => {
            const { dateString } = date();
            toast(message, {
                description: dateString
            });
        });
        
        window.addEventListener('beforeunload', () => {
            if(socket)
                socket.emit('leave-game', joinRoomCode);
        });

        socket.on("connect_error", err => {
            if(err.message === 'xhr poll error'){
                const { dateString } = date();
                toast(`Failed : Server Connection Error`, {
                    description: dateString
                });
                socket.disconnect();
            }
            const { dateString } = date();
            toast(`Failed : ${err.message}`, {
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

            socket.emit('create-room', authUser.username, authUser.profilePic, (res: gameResponse) => {
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
                    setGameDetails(res);
                    joinRoomCode = res.secretcode;
                    resolve({ code: res.secretcode });
                }
            })
        })
    };

    const joinRoom = (roomId:string): Promise<roomCode> => {
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

            socket.emit('join-room', authUser.username, authUser.profilePic, roomId, (res: gameResponse) => {
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
                    setGameDetails(res);
                    joinRoomCode = res.secretcode;
                    resolve({ code: res.secretcode });
                }
            })
        })
    };

    const generateWord = (): Promise<generateWord> => {
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

            socket.emit('generate-word', joinRoomCode);
            resolve({})
        })
    };

    const returnCode = () => {
        if (!socket) {
            return undefined;
        }
        return joinRoomCode;
    }

    return {
        createSocketConnection,
        createRoom,
        joinRoom,
        generateWord,
        returnCode
    }
}

export {
    useSocket
}