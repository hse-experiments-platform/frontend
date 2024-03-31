import { useContext, useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Page from '../../components/pages/Page';
import styled from 'styled-components';
import Logo from '../../components/Logo';
import { useNavigate } from "react-router";
import { AuthContext, AuthContextType } from "../../contexts/AuthContext";
import { getToken } from "../../api/auth";
import checkAuth from "../../utils/checkAuth";

const LogoContainer = styled.div`
    height: 70px;
    margin-left: 25px;
    margin-top: 15px;
`;

const StyledLogo = styled(Logo)`
    font-size: 40px;
    font-family: 'Lato';
    font-weight: 700;
`;

const WelcomeMessage = styled.h3`
    width: 500px;
    margin: 110px auto 0px auto;

    text-align: center;
    font-family: 'Lato';
    font-size: 30px;
    font-weight: 400; 
`

const StyledButton = styled.button`
    width: 410px;
    height: 45px;
    margin: 30px auto 0px auto;

    display: flex;
    flex-direction: row;

    border: 1px solid #0245D1;
    border-radius: 5px;
    background-color: #03256C;
`;

const GoogleLogo = styled.div`
    background-color: white;
    background-image: url('https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg');
    width: 43px;
    height: 43px;
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: center;

    border-right: 1px solid #0245D1;
    border-radius: 5px;
`;

const AuthText = styled.h3`
    margin-top: 8px;
    flex-grow: 4;
    text-align: center;

    font-family: 'Lato';
    font-size: 20px;
    font-weight: 700;

    color: white;
`

export const AuthPage = () => {
    const [googleToken, setGoogleToken] = useState<string | null>(null);
    const { isAuthorized, setIsAuthorized } = useContext(AuthContext) as AuthContextType;
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthorized) {
            navigate("/datasets");
        }
        if (checkAuth()) {
            setIsAuthorized(true);
            navigate("/datasets");
        }
    }, [navigate, isAuthorized])

    useEffect(() => {
        if (!googleToken)
            return;

        const requestToken = async () => {
            const response = await getToken({ google_oauth_token: googleToken});
            
            if (response) {
                setIsAuthorized(true);
                localStorage.setItem('accessToken', response.token);
                console.log(response.token);
            }
        }
    
        requestToken();
    }, [googleToken, setIsAuthorized]);

    const login = useGoogleLogin({
        onSuccess: tokenResponse => setGoogleToken(tokenResponse.access_token),
        onError: error => alert("fuck"),
        onNonOAuthError: () => alert("non auth"),
        scope: "https://www.googleapis.com/auth/userinfo.email"
    });

    return (
        <Page>
            <LogoContainer>
                <StyledLogo/>
            </LogoContainer>

            <WelcomeMessage>
                Login to access machine<br/>
                learning functions 
            </WelcomeMessage>

            <StyledButton onClick={() => login()}>
                <GoogleLogo/>
                <AuthText>
                    Sign in with Google
                </AuthText>
            </StyledButton>
        </Page>
    );
}

