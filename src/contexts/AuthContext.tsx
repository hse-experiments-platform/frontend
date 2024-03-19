import { Dispatch, SetStateAction, createContext, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

export type AuthContextType = {
    isAuthorized: boolean;
    setIsAuthorized: Dispatch<SetStateAction<boolean>>;
    internalToken: string;
    setInternalToken: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: JSX.Element }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [internalToken, setInternalToken] = useState<string>("");
  
    return (
      <GoogleOAuthProvider clientId="79865673729-n5iihc680eeiv2v5lhscajii8fqm8ima.apps.googleusercontent.com">
      <AuthContext.Provider value={{ isAuthorized, setIsAuthorized, internalToken, setInternalToken }}>
        {children}
      </AuthContext.Provider>
      </GoogleOAuthProvider>
    );
}