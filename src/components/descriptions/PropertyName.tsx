import styled from 'styled-components';

const Container = styled.p`
    font-weight: 700;
    font-size: 18px;
`

interface PropertyNameProps {
    text: string;
}

export const PropertyName = ({text}: PropertyNameProps) => {
    return (
        <Container>{text}</Container>
    )
}