import styled from 'styled-components';
import * as Accordion from '@radix-ui/react-accordion';
import { TiArrowSortedDown } from "react-icons/ti";

const StyledArrowDown = styled(TiArrowSortedDown)`
    color: #03256C;
    width: 30px;
    height: 30px;
`

const AccordionTrigger = styled(Accordion.Trigger)`
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: white;
    border: none;
    border-bottom: 1px solid #03256C;
    width: 40%;
    padding: 7px 0;

    &[data-state='closed'] > ${StyledArrowDown} {
        transform: rotate(-90deg);
    }
`

const ItemTitle = styled.h3`
    display: block;
    color: #03256C;
    font-size: 20px;
`

const AccordionContent = styled(Accordion.Content)`
    margin: 10px 20px;
`

interface AccordionItemProps {
    value: string;
    title: string;
    children: any;
}

export const AccordionItem = ({value, title, children}: AccordionItemProps) => {
    return (
        <Accordion.Item value={value}>
            <Accordion.Header>
                <AccordionTrigger>
                    <ItemTitle>{title}</ItemTitle>
                    <StyledArrowDown/>
                </AccordionTrigger>
            </Accordion.Header>
            <AccordionContent>
                {children}
            </AccordionContent>
        </Accordion.Item>
    )
}