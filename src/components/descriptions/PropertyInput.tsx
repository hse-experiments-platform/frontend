import styled from 'styled-components';

const StyledInput = styled.input`
    display: block;
    border: 1px solid black;
    border-radius: 10px;
    height: 25px;
    background-color: #EBEBEB;
    padding-left: 10px;
`

interface PropertyInputProps {
    disabled?: boolean;
    value?: string;
    setValue?: (newValue: string) => void;
}

export const PropertyInput = ({disabled = false, value='', setValue=(_: string)=>{}}: PropertyInputProps) => {
    return (
        <StyledInput disabled={disabled} value={value} onChange={e => setValue(e.currentTarget.value)}/>
    )
}