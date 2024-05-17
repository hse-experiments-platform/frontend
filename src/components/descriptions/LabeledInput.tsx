import { PropertyName } from "./PropertyName";
import { ValidatedInput } from "./ValidatedInput";

interface LabeledInputProps {
    label: string;
    register?: any;
    error?: string;
    disabled?: boolean;
    constValue?: string;
    placeholder?: string;
}

export const LabeledInput = ({label, register, error, disabled, constValue, placeholder}: LabeledInputProps) => {
    return (
        <>
            <PropertyName text={label}/>
            <ValidatedInput
                register={register}
                error={error}
                disabled={disabled}
                constValue={constValue}
                placeholder={placeholder}
            />
        </>
    )
}