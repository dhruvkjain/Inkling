import { BrowserRouter, Routes, Route } from "react-router-dom";

import Component from './pages/Component.tsx';
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
      <div className="flex-grow flex justify-center items-center">
      <Routes>
        <Route index 
          element={(authUser === undefined) ? <Account /> : <Component/>}
        />
        <Route path="game"
          element={<Component/>} 
        />
      </Routes>
      </div>
      <Toaster className="cursor-grab" />
      </div>
    </BrowserRouter>
  )
}

export default App