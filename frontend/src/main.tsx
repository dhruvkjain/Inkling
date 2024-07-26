import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { GameContextProvider } from './context/GameContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
    <GameContextProvider>
      <App />
    </GameContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
