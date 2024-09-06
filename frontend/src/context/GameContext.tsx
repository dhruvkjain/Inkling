import { createContext, useContext, useState, useRef, ReactNode, MutableRefObject } from "react";

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

type Point = {
    x:number;
    y:number;
}

type words = [string] | undefined

export type GameContextType = {
    gameDetails: gameResponse | undefined;
    isEditor: boolean;
    setIsEditor: (newValue: boolean) => void;
    setGameDetails: (newValue: gameResponse | undefined) => void;
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
    words: [string] | undefined;
    setWords: (words: words) => void;
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
    prevPoint: MutableRefObject<Point | null>;
    mouseDown: boolean;
    setMouseDown: (newValue: boolean) => void;
}
type ContextProps = {
    children: ReactNode;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

function GameContextProvider({ children }: ContextProps) {

    const [gameDetails, setGameDetails] = useState<gameResponse | undefined>(undefined);
    const [isEditor, setIsEditor] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [words, setWords] = useState<words>(undefined);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const prevPoint = useRef<null | Point>(null);
    const [mouseDown, setMouseDown] = useState<boolean>(false);

    return (
        <GameContext.Provider value={{
            gameDetails,
            isEditor,
            setIsEditor,
            setGameDetails,
            openDialog,
            setOpenDialog,
            words,
            setWords,
            canvasRef,
            prevPoint,
            mouseDown,
            setMouseDown,
        }}>
            {children}
        </GameContext.Provider>
    )
}

function useGameContext() {
    return useContext(GameContext);
}

export {
    GameContext,
    GameContextProvider,
    useGameContext
}