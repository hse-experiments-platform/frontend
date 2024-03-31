import { styled } from 'styled-components';
import Logo from './Logo';

const Container = styled.div`
    height: 70px;
    width: 100%;
    background-color: white;
    border: solid black 1px;
`;

const StyledLogo = styled(Logo)`
    padding-top: 15px;
    margin-left: 13px;

    font-size: 30px;
    font-weight: 700;
`;

export const Header = () => {

    return (
        <Container>
            <StyledLogo/>
        </Container>
    )
}
