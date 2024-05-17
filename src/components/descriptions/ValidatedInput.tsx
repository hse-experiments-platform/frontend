import styled from "styled-components";
import ValidatedProperty from "./ValidatedProperty";

const StyledInput = styled.input<{bigSized: boolean}>`
    display: block;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #EBEBEB;
    padding-left: ${props => props.bigSized ? '15px' : '10px'};
    width: ${props => props.bigSized ? '280px' : '200px'};
    height: ${props => props.bigSized ? '35px' : '30px'};
`

interface ValidatedInputProps {
    register?: any;
    error?: string;
    disabled?: boolean;
    constValue?: string;
    placeholder?: string;
    bigSized?: boolean;
}

export const ValidatedInput = ({register, error, disabled, constValue, placeholder, bigSized=false}: ValidatedInputProps) => {
    return (
        <ValidatedProperty errorMessage={error}>
            <StyledInput
                className="styled-input"
                {...register}
                disabled={disabled}
                value={constValue}
                placeholder={placeholder}
                bigSized={bigSized}
            />
        </ValidatedProperty>
    )
}