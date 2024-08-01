/**
 * v0 by Vercel.
 * @see https://v0.dev/t/n7Db7XIz79G
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ClockIcon, TrophyIcon, UsersIcon } from "../components/Icons.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useGameContext, GameContextType } from "../context/GameContext.tsx";
import { useSocket, errorMessage } from '../hooks/useSocket.tsx';

function Game() {

  const { gameDetails, openDialog, setOpenDialog, words } = useGameContext() as GameContextType;
  const navigate = useNavigate();
  const { selectedWord } = useSocket();

  useEffect(() => {
    if (gameDetails?.secretcode === undefined) {
      navigate('/game');
    }
  });

  async function sendSelectedWord(word:string){
    console.log(word);
    const res:errorMessage = await selectedWord(word);
    if(res.error) {
      return;
    }
  }

  return (
    <div className="flex-grow flex flex-col justify-between h-full w-full">
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        {/* <Button onClick={()=>{setOpenDialog(!openDialog)}}>Show</Button> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Select a word to draw</AlertDialogTitle>
            <AlertDialogDescription>
              {
                words?.map((word)=>{
                  return(
                    <>
                      <Button onClick={()=>{sendSelectedWord(word)}} variant={'link'} className='text-primary mr-4 cursor-pointer underline-offset-4 hover:underline'>{word}</Button>
                    </>
                  )
                })
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <main className="flex-grow bg-background text-foreground pt-4 pl-8 pr-8 pb-4">
        <div className="w-full h-full grid grid-cols-4 gap-8">
          <div className="bg-card rounded-lg shadow p-6 col-span-3">
            <h2 className="text-xl font-bold mb-4">Drawing Canvas</h2>
            <div className="w-full h-full">
            </div>
          </div>
          <div className="bg-card flex flex-col justify-between rounded-lg shadow p-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Guesses</h2>
              <div className="space-y-4 overflow-y-auto">
                {
                  gameDetails?.players?.map((player) => {
                    return (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={player.profilePic} />
                            <AvatarFallback>DJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{player.username}</p>
                            <p className="text-muted-foreground text-sm">Guessed: "Flower"</p>
                          </div>
                        </div>
                        <Badge variant="outline">Correct</Badge>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className='pt-2 rounded-lg'>
              <div className="flex w-full justify-between items-center">
                <Input className='mr-4' id="guess" placeholder="your guess ...." />
                <Button>Send</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-card text-foreground p-4 shadow">
        <div className="container flex justify-between items-center">
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
              <span>{gameDetails?.players?.length}/8</span>
            </div>
          </div>
          <div>
            <p className='text-xl'><span className='font-bold'>Room Code: </span>{gameDetails?.secretcode}</p>
          </div>
          <Button className='font-medium text-xl' variant="link" >Leave Game</Button>
        </div>
      </footer>
    </div>
  )
}

export default Game