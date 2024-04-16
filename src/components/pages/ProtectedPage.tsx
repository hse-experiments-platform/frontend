import { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner';
import { styled } from 'styled-components';
import { Header, CustomSidebar } from '../../components';
import Page from './Page';
import { AuthContextType, AuthContext, RequestContext, RequestContextType } from '../../contexts';
import ErrorPage from './ErrorPage';
import checkAuth from '../../utils/checkAuth';

const Main = styled.div`
  height: calc(100vh - 70px);
  display: flex;
`;

const InnerWrapper = styled.div`
    background-color: #F5F5F5;
    padding: 30px 50px;
    height: 100%;
    width: 100%;
`

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`

const ProtectedPage = ({ children }: { children: any }) => {
    const navigate = useNavigate();
    const { isAuthorized, setIsAuthorized } = useContext(AuthContext) as AuthContextType;
    const { error, isLoading, setError, setIsLoading } = useContext(RequestContext) as RequestContextType;

    useEffect(() => {
        setError(null);
        setIsLoading(false);
    }, [setError, setIsLoading]);

    useEffect(() => {
        if (!isAuthorized && checkAuth()) {
            setIsAuthorized(true);
        } else if (!isAuthorized) {
            navigate('/login');
        }
    }, [navigate, isAuthorized]);

    const spinnerStyle = {
        position: 'absolute',
        top: '43%',
        left: '47%',
        zIndex: '9999',
    };

    return (
        <div>
            <Header />
            <Main>
                <CustomSidebar />
                <Page>
                    <InnerWrapper>
                        {isLoading && (
                            <>
                                <Overlay/>
                                <TailSpin
                                    color='black'
                                    wrapperStyle={spinnerStyle}
                                />
                            </>
                        )}
                        {error ? <ErrorPage /> : children}
                    </InnerWrapper>
                </Page>
            </Main>
        </div>
    )
}

export default ProtectedPage;