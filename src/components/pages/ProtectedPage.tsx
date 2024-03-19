import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from 'styled-components';
import { Header, CustomSidebar } from '../../components';
import Page from './Page';
import { AuthContextType, AuthContext, RequestContext, RequestContextType } from '../../contexts';
import ErrorPage from './ErrorPage';

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

const ProtectedPage = ({ children }: { children: JSX.Element | JSX.Element[]}) => {
    const navigate = useNavigate();
    const { isAuthorized } = useContext(AuthContext) as AuthContextType;
    const { error, isLoading } = useContext(RequestContext) as RequestContextType;

    /*useEffect(() => {
        if (!isAuthorized) {
            navigate('/login');
        }
    }, [navigate, isAuthorized]);*/

    return (
        <div>
            <Header/>
            <Main>
                <CustomSidebar/>
                <Page>
                    <InnerWrapper>
                        { isLoading ?
                            <>Loading...</> :
                            (error ?
                                <ErrorPage/> : children
                            )
                        }
                    </InnerWrapper>
                </Page>
            </Main>
        </div>
    )
}

export default ProtectedPage;