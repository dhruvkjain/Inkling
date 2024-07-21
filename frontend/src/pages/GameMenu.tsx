import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { useSocket, roomCode } from "../hooks/useSocket.tsx";

function GameMenu() {

  const { createSocketConnection, createRoom } = useSocket();
  async function initiateSocketConnection (){
    createSocketConnection();
    const roomcode:roomCode = await createRoom();
    if(!roomcode.error){
      console.log(roomcode.code);
    }
  }

  return (
    <div className="flex-grow flex justify-center items-center flex-col h-full w-full">
    <Tabs defaultValue="join" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="join">Join Room</TabsTrigger>
        <TabsTrigger value="create">Create Room</TabsTrigger>
      </TabsList>
      <TabsContent value="join">
        <Card>
          <CardHeader>
            <CardTitle>Join Room</CardTitle>
            <CardDescription>
              Enter Secret Code of Room.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="create">
        <Card>
          <CardHeader>
            <CardTitle>Create Room</CardTitle>
            <CardDescription>
              Create a new Room.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="">
              <Button onClick={initiateSocketConnection}>Create room</Button>
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
  )
}

export default GameMenu