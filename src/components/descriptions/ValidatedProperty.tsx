import styled from 'styled-components';
import { FaExclamationTriangle } from "react-icons/fa";
import * as Tooltip from '@radix-ui/react-tooltip';

interface ValidatedProperty {
    errorMessage?: string;
    children: React.ReactNode;
}

const ErrorContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 10px;

    :first-child {
        min-width: 80%;
    }
`

const Icon = styled(FaExclamationTriangle)`
    width: 25px;
    height: 24px;
    color: red;
`

const TooltipContent = styled(Tooltip.Content)`
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 13px;
    line-height: 1;
    color: black;
    background-color: orange;
    user-select: none;
    margin: 5px;
`

const TooltipTrigger = styled(Tooltip.Trigger)`
    border: none;
    background: transparent;
`

const tooltipped = (child: React.ReactNode, message: string) => {
    return (
        <Tooltip.Provider delayDuration={5}>
            <Tooltip.Root>
                <TooltipTrigger>
                    {child}
                </TooltipTrigger>
                <Tooltip.Portal>
                    <TooltipContent>
                        <p>{message}</p>
                    </TooltipContent>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}

const ValidatedProperty = ({errorMessage, children}: ValidatedProperty) => {
    return (
        <ErrorContainer>
            {children}
            {errorMessage && tooltipped(<Icon/>, errorMessage)}
        </ErrorContainer>
    )
}

export default ValidatedProperty