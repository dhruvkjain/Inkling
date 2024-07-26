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

export type GameContextType = {
    gameDetails: gameResponse | undefined;
    setGameDetails: (newValue: gameResponse | undefined) => void;
}
type ContextProps = {
    children: ReactNode;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

function GameContextProvider({ children }: ContextProps) {

    const [gameDetails, setGameDetails] = useState<gameResponse | undefined>(undefined);

    return <GameContext.Provider value={{ gameDetails, setGameDetails }}>
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