import { useState, useCallback } from "react";

import { httpSignup, httpLogin, httpLogout } from "./request";
import { date } from "../utils/date.ts";

import { toast } from "sonner"
import { useAuthContext, AuthContextType } from "../context/AuthContext";

function useAuth(){
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const { setAuthUser } = useAuthContext() as AuthContextType;

    const submitSignup = useCallback(async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const fullName = data.get("name")?.toString();
        const gender = data.get("gender")?.toString();
        const username = data.get("username")?.toString();
        const password = data.get("password")?.toString();
        const confirmPassword = data.get("confirmPassword")?.toString();

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            const {dateString} = date();
            toast("Failed Sign up : Missing field/s",{
              description: dateString,
            });
            setLoggedIn(false);
            return ;
        }
        else{
          if(password !== confirmPassword) {
            const {dateString} = date();
            toast("Failed Sign up : Passwords don't match",{
              description: dateString,
            });
            setLoggedIn(false);
            return ;
          }
        }
        const response = await httpSignup({
            fullName,
            gender,
            username,
            password,
            confirmPassword
        });
    
        const success = response.ok;
        // console.log(response);
        if (success) {
          if(response.error){
            const {dateString} = date();
            toast(`Failed Sign up : ${response.error}`,{
             description: dateString
            });
            setLoggedIn(false);
          }
          else{
            setTimeout(() => {
              localStorage.setItem("userData",JSON.stringify(response));
              setAuthUser(response);
              setLoggedIn(true);
              toast("Sign up successfull !!");
            }, 800);
          }
        } else {
          const {dateString} = date();
          toast(`Failed Sign up : ${response.error}`,{
            description: dateString
          });
          setLoggedIn(false);
        }
    }, [setAuthUser]);

    const submitLogin = useCallback(async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.target as HTMLFormElement);
      const usernamelogin = data.get("usernamelogin")?.toString();
      const passwordlogin = data.get("passwordlogin")?.toString();
      if (!usernamelogin || !passwordlogin) {
        const {dateString} = date();
        toast("Failed Login : Missing field/s",{
          description: dateString,
        });
          setLoggedIn(false);
          return ;
      }

      const response = await httpLogin({
          username:usernamelogin,
          password:passwordlogin
      });
      
      const success = response.ok;
      if (success) {
        if(response.error){
          const {dateString} = date();
          toast(`Failed Login : ${response.error}`,{
           description: dateString
          });
          setLoggedIn(false);
        }
        else{
          setTimeout(() => {
            localStorage.setItem("userData",JSON.stringify(response));
            setAuthUser(response);
            setLoggedIn(true);
            toast("Login successfull !!");
          }, 800);
        }
      } else {
        const {dateString} = date();
        toast(`Failed Login : ${response.error}`,{
          description: dateString
        });
        setLoggedIn(false);
      }
    }, [setAuthUser]);

    const submitLogout = useCallback(async () => {
      
      const response = await httpLogout();

      const success = response.ok;
      if (success) {
        if(response.error){
          const {dateString} = date();
          toast(`Failed Login : ${response.error}`,{
           description: dateString
          });
        }
        else{
          localStorage.removeItem("userData");
          setAuthUser(undefined);
          setLoggedIn(false);
          toast("Logout successfull !!");
        }
      } else {
        const {dateString} = date();
        toast(`Failed Logout : ${response.error}`,{
          description: dateString
        });
      }
    }, [setAuthUser]);

    return {
        isLoggedIn,
        submitSignup,
        submitLogin,
        submitLogout
    }
}

export {
  useAuth
}