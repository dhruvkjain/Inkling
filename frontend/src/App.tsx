import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Game from './pages/Game.tsx';
import GameMenu from "./pages/GameMenu.tsx";
import Account from "./pages/Account.tsx";
import Header from "./components/Header.tsx";
import { Toaster } from "@/components/ui/sonner"

import "./App.css";

import { useAuthContext, AuthContextType } from "./context/AuthContext.tsx";

function App() {

  const { authUser } = useAuthContext() as AuthContextType;

  return (
    <BrowserRouter>
      <div className="min-h-[100lvh] flex flex-col">
      <Header />
      <Routes>
        <Route index 
          element={(authUser === undefined) ? <Account /> : <Navigate to="/game"/>}
        />
        <Route path="game"
          element={(authUser === undefined) ? <Navigate to="/"/> : <GameMenu/>} 
        />
      </Routes>
      <Toaster className="cursor-grab" />
      </div>
    </BrowserRouter>
  )
}

export default App