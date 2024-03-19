import styled from "styled-components";

interface PageTitleProps {
    title: string;
}

const StyledTitle = styled.h2`
    font-size: 27px;
    font-weigth: 400;
`;

export const PageTitle = ({title}: PageTitleProps) => {
    return (
        <StyledTitle>{title}</StyledTitle>
    )
}