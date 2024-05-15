import styled from 'styled-components';
import { PropertyName } from "./PropertyName";
import ValidatedProperty from './ValidatedProperty';

interface LabeledInputProps {
    label: string;
    register?: any;
    error?: string;
    disabled?: boolean;
    constValue?: string;
    placeholder?: string;
}

const StyledInput = styled.input`
    display: block;
    border: 1px solid black;
    border-radius: 10px;
    height: 25px;
    background-color: #EBEBEB;
    padding-left: 10px;
`

export const LabeledInput = ({label, register, error, disabled, constValue, placeholder}: LabeledInputProps) => {
    return (
        <>
            <PropertyName text={label}/>
            <ValidatedProperty errorMessage={error}>
                <StyledInput className="styled-input" {...register} disabled={disabled} value={constValue} placeholder={placeholder}/>
            </ValidatedProperty>
        </>
    )
}