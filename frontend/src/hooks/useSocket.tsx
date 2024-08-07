// import { useRef } from "react";
import { toast } from "sonner";
import { date } from "../utils/date.ts";
import { io, Socket } from 'socket.io-client';

import { useAuthContext, AuthContextType } from "../context/AuthContext";
import { gameResponse, useGameContext, GameContextType } from "../context/GameContext.tsx";

export type roomCode = {
    error?: string;
    code?: string;
};

export type errorMessage = {
    error?: string;
}

export type guessResponse = {
    ok?: boolean;
    error?: string;
}

// declare persistant variable here as everytime useSocket hook is called
// we want to persist data in a variable and not redeclare them.
let socket: Socket;
let joinRoomCode: string | undefined;

function useSocket() {

    const { authUser } = useAuthContext() as AuthContextType;
    const { setGameDetails, setOpenDialog, setWords } = useGameContext() as GameContextType;

    const createSocketConnection = () => {
        if (socket) return;   // Prevent re-initialization
        socket = io('http://localhost:3000', {
            withCredentials: true // to pass cookies to socket
        });

        socket.on("notification", message => {
            const { dateString } = date();
            toast(message, {
                description: dateString
            });
        })

        socket.on("update-gameDetails", gameData => {
            setGameDetails(gameData);
        })

        socket.on("countdown", time => {
            if (time > 0) {
                const counterInput = document.getElementById('counter') as HTMLSpanElement;
                counterInput.innerHTML = (time).toString();
            } else {
                const counterbody = document.getElementById('counterbody') as HTMLDivElement;
                counterbody.style.display = 'none';
                const drawarea = document.getElementById('drawarea') as HTMLDivElement;
                drawarea.style.display = 'block';
            }
        });

        socket.on("roundtimer", async(time) => {
            const timer = document.getElementById('timer') as HTMLHeadingElement;
            timer.style.display = 'block';
            const drawarea = document.getElementById('drawarea') as HTMLDivElement;
            drawarea.style.display = 'block';
            const seconds = document.getElementById('seconds') as HTMLSpanElement;
            if (time > 0) {
                seconds.innerHTML = (time).toString();
            } else {
                timer.style.display = 'none';
                seconds.innerHTML = '180';
                const drawarea = document.getElementById('drawarea') as HTMLDivElement;
                drawarea.style.display = 'none';
            }
        });

        socket.on("select-word", gameData => {
            setWords(gameData);
            setOpenDialog(true);
        })

        window.addEventListener('beforeunload', () => {
            if (socket)
                socket.emit('leave-game', joinRoomCode);
        });

        socket.on("connect_error", err => {
            if (err.message === 'xhr poll error') {
                const { dateString } = date();
                toast(`Failed : Server Connection Error`, {
                    description: dateString
                });
                socket?.disconnect();
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
                resolve({ error: "No socket connection" });
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

    const joinRoom = (roomId: string): Promise<roomCode> => {
        return new Promise((resolve) => {
            if (!socket) {
                resolve({ error: "No socket connection" });
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

    const startcountdown = (): Promise<errorMessage> => {
        return new Promise((resolve) => {
            if (!socket) {
                resolve({ error: "No socket connection" });
                return;
            }

            if (authUser === undefined) {
                const { dateString } = date();
                toast(`Failed to Start countdown : Login first`, {
                    description: dateString
                });
                resolve({ error: "No Auth User" });
                return;
            }

            socket.emit('start-countdown', joinRoomCode);
            resolve({})
        })
    };

    const generateWord = (): Promise<errorMessage> => {
        return new Promise((resolve) => {
            if (!socket) {
                resolve({ error: "No socket connection" });
                return;
            }

            if (authUser === undefined) {
                const { dateString } = date();
                toast(`Failed to Start game : Login first`, {
                    description: dateString
                });
                resolve({ error: "No Auth User" });
                return;
            }

            socket.emit('generate-word', joinRoomCode);
            resolve({})
        })
    };

    const selectedWord = (word: string): Promise<errorMessage> => {
        return new Promise((resolve) => {
            if (!socket) {
                resolve({ error: "No socket connection" });
                return;
            }

            if (authUser === undefined) {
                const { dateString } = date();
                toast(`Failed to Start game : Login first`, {
                    description: dateString
                });
                resolve({ error: "No Auth User" });
                return;
            }

            socket.emit('selected-word', word, joinRoomCode, (res: errorMessage) => {
                if (res.error) {
                    const { dateString } = date();
                    toast(`Failed to generate word : ${res.error}`, {
                        description: dateString
                    });
                    setOpenDialog(false);
                    return ({ error: res.error });
                }
                else {
                    const { dateString } = date();
                    toast(`Start to draw word: ${word}`, {
                        description: dateString
                    });
                    setOpenDialog(false);

                    socket.emit('start-round-timer', joinRoomCode);
                    return ({});
                }
            })
            return ({})
        })
    };

    const submitGuess = (word: string): Promise<guessResponse> => {
        return new Promise((resolve) => {
            if (!socket) {
                resolve({ error: "No socket connection" });
                return;
            }

            if (authUser === undefined) {
                const { dateString } = date();
                toast(`Failed to submit guess : Login first`, {
                    description: dateString
                });
                resolve({ error: "No Auth User" });
                return;
            }

            console.log(word);
            socket.emit('submit-guess', word, joinRoomCode, authUser.username, (res: guessResponse) => {
                if (res.error) {
                    const { dateString } = date();
                    toast(`Error Rejoin please: ${res.error}`, {
                        description: dateString
                    });
                    return ({ error: res.error });
                }
                else {
                    if (!res.ok) {
                        const { dateString } = date();
                        toast(`Wrong guess: ${word}`, {
                            description: dateString
                        });
                    }
                    else {
                        const timer = document.getElementById('timer') as HTMLHeadingElement;
                        timer.style.display = 'none';
                        const drawarea = document.getElementById('drawarea') as HTMLDivElement;
                        drawarea.style.display = 'none';
                        const seconds = document.getElementById('seconds') as HTMLSpanElement;
                        seconds.innerHTML = '180';
                    }
                    return (res);
                }
            })
            return ({})
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
        startcountdown,
        generateWord,
        selectedWord,
        submitGuess,
        returnCode
    }
}

export {
    useSocket
}