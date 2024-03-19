import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import ProtectedPage from "../../components/pages/ProtectedPage";

export const LogoutPage = () => {
    const { setIsAuthorized } = useContext(AuthContext) as AuthContextType;

    useEffect(() => {
        setIsAuthorized(false) 
    }, []);

    return (
        <ProtectedPage>
            <>Logout...</>
        </ProtectedPage>
    )
}