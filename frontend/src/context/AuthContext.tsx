import { createContext, useContext, useState, ReactNode } from "react";

export type AuthContextType = {
    authUser: string | undefined;
    setAuthUser: (newValue: string | undefined) => void;
}
type ContextProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthContextProvider({ children }: ContextProps) {
    const userData = localStorage.getItem("userData");
    // console.log(userData);

    let parsedUserData: string | undefined = undefined;
    if (userData) {
      try {
        parsedUserData = JSON.parse(userData);
      } catch (error) {
        parsedUserData = undefined;
      }
    }
    // console.log(parsedUserData);

    const [authUser, setAuthUser] = useState<string | undefined>(parsedUserData);

    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
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