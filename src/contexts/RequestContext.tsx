import { Dispatch, SetStateAction, createContext, useState } from "react";

export type RequestContextType = {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;
}

export const RequestContext = createContext<RequestContextType | null>(null);

export const RequestContextProvider = ({ children }: { children: JSX.Element }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    return (
      <RequestContext.Provider value={{ isLoading, setIsLoading, error, setError }}>
        {children}
      </RequestContext.Provider>
    );
}