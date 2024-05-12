import styled from 'styled-components';

export const StyledButton = styled.button<{isPrimary?: boolean}>`
    width: 100px;
    height: ${props => props.isPrimary ? "30px" : "35px"};
    border: 1 px solid black;
    border-radius: 25px;
    background-color: #0245D1;
    font-size: 17px;
    color: white;
    
    display: flex;
    gap: 11px;
    justify-content: center;
    align-items: center;
`

StyledButton.defaultProps = {
    isPrimary: true
}