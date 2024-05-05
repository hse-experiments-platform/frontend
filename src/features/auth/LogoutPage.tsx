import { useContext, useEffect } from "react";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import { ProtectedPage } from "../../components/pages";

export const LogoutPage = () => {
    const { setIsAuthorized } = useContext(AuthContext) as AuthContextType;

    useEffect(() => {
        setIsAuthorized(false);
        localStorage.removeItem('accessToken');
    }, []);

    return (
        <ProtectedPage>
            <>Logout...</>
        </ProtectedPage>
    )
}