import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import GameMenu from "./pages/GameMenu.tsx";
import Account from "./pages/Account.tsx";
import Game from "./pages/Game.tsx";
import Header from "./components/Header.tsx";
import { Toaster } from "@/components/ui/sonner"

import "./App.css";

import { useAuthContext, AuthContextType } from "./context/AuthContext.tsx";


function App() {

  const { authUser, joinRoomCode } = useAuthContext() as AuthContextType;
  console.log(joinRoomCode);

  return (
    <BrowserRouter>
      <div className="min-h-[100lvh] flex flex-col">
      <Header />
      <Routes>
        <Route index 
          element={(authUser === undefined) ? <Account /> : <Navigate to="/gameMenu"/>}
        />
        <Route path="gameMenu"
          element={authUser === undefined ? (
            <Navigate to="/" />
          ) : joinRoomCode !== undefined ? (
            <Navigate to="/game" />
          ) : (
            <GameMenu />
          )}
        />
        <Route path="game"
          element={(authUser === undefined || joinRoomCode === undefined) ? <Navigate to="/"/> : <Game/>} 
        />
      </Routes>
      <Toaster className="cursor-grab" />
      </div>
    </BrowserRouter>
  )
}

export default App