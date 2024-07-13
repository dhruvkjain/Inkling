import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Component from './pages/Component.tsx';
import Login from "./pages/Login.tsx";
import Header from "./components/Header.tsx";
import { Toaster } from "@/components/ui/sonner"

import "./App.css";

import { useAuthContext, AuthContextType } from "./context/AuthContext.tsx";

function App() {

  const { authUser } = useAuthContext() as AuthContextType;
  console.log(authUser);

  return (
    <BrowserRouter>
      <div className="min-h-[100lvh] flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center">
      <Routes>
        <Route index 
          element={authUser ? <Navigate to="game" /> : <Login />}
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