/**
 * v0 by Vercel.
 * @see https://v0.dev/t/n7Db7XIz79G
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ClockIcon, TrophyIcon, UsersIcon } from "../components/Icons.tsx";

import { useGameContext, GameContextType } from "../context/GameContext.tsx";

function Game() {

  const { gameDetails } = useGameContext() as GameContextType;
  const navigate = useNavigate();
  useEffect(()=>{
    if(gameDetails?.secretcode === undefined){
      navigate('/game');
    }
  });

  return (
    <div className="flex-grow flex flex-col h-full w-full">
      {/* <header className="bg-primary text-primary-foreground p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Drawful</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              <span>4/8</span>
            </div>
            <Button variant="outline">Leave Game</Button>
          </div>
        </div>
      </header> */}
      <main className="flex-1 bg-background text-foreground p-8">
        <div className="container mx-auto grid grid-cols-2 gap-8">
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Drawing Canvas</h2>
            <div className="w-full aspect-video bg-muted rounded-lg overflow-hidden">
              <div className="w-full h-full" />
            </div>
          </div>
          <div className="bg-card rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Guesses</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-muted-foreground text-sm">Guessed: "Flower"</p>
                  </div>
                </div>
                <Badge variant="outline">Correct</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-muted-foreground text-sm">Guessed: "Tree"</p>
                  </div>
                </div>
                <Badge variant="outline">Incorrect</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>MD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Michael Davis</p>
                    <p className="text-muted-foreground text-sm">Guessed: "Sun"</p>
                  </div>
                </div>
                <Badge variant="outline">Correct</Badge>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-card text-foreground p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5" />
              <span>00:45</span>
            </div>
            <div className="flex items-center gap-2">
              <TrophyIcon className="w-5 h-5" />
              <span>Score: 120</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              <span>4/8</span>
            </div>
          </div>
          <Button variant="outline" >Leave Game</Button>
        </div>
      </footer>
    </div>
  )
}

export default Game