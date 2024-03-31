import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PageControlContainer = styled.div`
    margin-top: 10px;
    float: right;
    height: 25px;
    
    display: flex;
    justify-content: center;
    align-items: center;
`

const PageNumber = styled.p`
    font-size: 15px;
`

const StyledBackIcon = styled(IoIosArrowBack)<{disabled: boolean}>`
    width: 27px;
    heigth: 27px;
    color: ${props => props.disabled ? 'grey' : '#03256C'};
`

const StyledForwardIcon = styled(IoIosArrowForward)<{disabled: boolean}>`
    width: 27px;
    heigth: 27px;
    color: ${props => props.disabled ? 'grey' : '#03256C'};
`

interface PageControlProps {
    pageIndex: number;
    setPageIndex: Dispatch<SetStateAction<number>>;
    maxPageIndex: number;
}

export const PageControl = ({pageIndex, setPageIndex, maxPageIndex}: PageControlProps) => {
    const nextPage = () => {
        if (pageIndex < maxPageIndex) {
            setPageIndex(pageIndex + 1)
        }
    }

    const previousPage = () => {
        if (pageIndex > 1) {
            setPageIndex(pageIndex - 1)
        }
    }

    return (
        <PageControlContainer>
            <StyledBackIcon disabled={pageIndex === 1} onClick={() => previousPage()}/>
            <PageNumber>{pageIndex}</PageNumber>
            <StyledForwardIcon disabled={pageIndex === maxPageIndex || maxPageIndex === 0} onClick={() => nextPage()}/>
        </PageControlContainer>
    )
}