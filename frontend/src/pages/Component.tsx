/**
 * v0 by Vercel.
 * @see https://v0.dev/t/n7Db7XIz79G
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground p-4 shadow">
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
      </header>
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
          </div>
          <Button>Submit Guess</Button>
        </div>
      </footer>
    </div>
  )
}

type Props = {
  className: string
}

function ClockIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}


function TrophyIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}


function UsersIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}