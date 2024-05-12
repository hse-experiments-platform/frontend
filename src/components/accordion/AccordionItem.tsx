import styled from 'styled-components';
import * as Accordion from '@radix-ui/react-accordion';
import { TiArrowSortedDown } from "react-icons/ti";

const StyledArrowDown = styled(TiArrowSortedDown)<{disabled: boolean}>`
    color: ${props => props.disabled ? "grey" : "#03256C"};
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

const AccordionHeader = styled(Accordion.Header)`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`

const ItemTitle = styled.h3<{disabled: boolean}>`
    display: block;
    color: ${props => props.disabled ? "grey" : "#03256C"};
    font-size: 20px;
`

const AccordionContent = styled(Accordion.Content)`
    margin: 10px 20px;
`

interface AccordionItemProps {
    value: string;
    title: string;
    children?: any;
    headerAdditionalAction?: JSX.Element;
    disabled?: boolean;
}

export const AccordionItem = ({value, title, children, headerAdditionalAction, disabled=false}: AccordionItemProps) => {
    return (
        <Accordion.Item value={value} disabled={disabled}>
            <AccordionHeader>
                <AccordionTrigger>
                    <ItemTitle disabled={disabled}>{title}</ItemTitle>
                    <StyledArrowDown disabled={disabled}/>
                </AccordionTrigger>
                {headerAdditionalAction}
            </AccordionHeader>
            <AccordionContent>
                {children}
            </AccordionContent>
        </Accordion.Item>
    )
}