import { createContext, useContext, useState, ReactNode } from "react";

export type authUser = {
  ok:boolean
  profilePic:string
  username:string
  fullName:string
  _id:string
}

export type AuthContextType = {
    authUser: authUser | undefined;
    setAuthUser: (newValue: authUser | undefined) => void;
    joinRoomCode: string | undefined;
    setRoomCode: (newValue: string | undefined) => void;
}
type ContextProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthContextProvider({ children }: ContextProps) {
    const userData = localStorage.getItem("userData");
    // console.log(userData);

    let parsedUserData: authUser | undefined = undefined;
    if (userData) {
      try {
        parsedUserData = JSON.parse(userData);
      } catch (error) {
        parsedUserData = undefined;
      }
    }
    // console.log(parsedUserData);

    const [authUser, setAuthUser] = useState<authUser | undefined>(parsedUserData);
    const [joinRoomCode, setRoomCode] = useState<string | undefined>(undefined);

    return <AuthContext.Provider value={{ authUser, setAuthUser, joinRoomCode, setRoomCode}}>
        {children}
    </AuthContext.Provider>
}

function useAuthContext (){
    return useContext(AuthContext);
}

export {
    AuthContext,
    AuthContextProvider,
    useAuthContext
}