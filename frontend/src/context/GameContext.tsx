import { createContext, useContext, useState, ReactNode } from "react";

export type player = {
    username: string;
    profilePic: string;
}

export type gameResponse = {
    creator?: string;
    secretcode?: string;
    players?: [player];
    error?: string;
}

type words = [string] | undefined

export type GameContextType = {
    gameDetails: gameResponse | undefined;
    setGameDetails: (newValue: gameResponse | undefined) => void;
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    words: [string] | undefined;
    setWords: (words: words) => void;
}
type ContextProps = {
    children: ReactNode;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

function GameContextProvider({ children }: ContextProps) {

    const [gameDetails, setGameDetails] = useState<gameResponse | undefined>(undefined);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [words, setWords] = useState<words>(undefined);

    return <GameContext.Provider value={{ gameDetails, setGameDetails, openDialog, setOpenDialog, words, setWords }}>
        {children}
    </GameContext.Provider>
}

function useGameContext() {
    return useContext(GameContext);
}

export {
    GameContext,
    GameContextProvider,
    useGameContext
}