import { PropertyName } from "./PropertyName";
import { Option } from "./PropertySelector";
import ValidatedProperty from "./ValidatedProperty";

interface LabeledSelectorProps {
    label: string;
    register: any;
    onChangeCallback?: () => void;
    options: Option[];
    defaultValue?: string;
    isDefaultSelected?: boolean;
    error?: string;
}

export const LabeledSelector = ({label, register, options, defaultValue, onChangeCallback, error, isDefaultSelected=true}: LabeledSelectorProps) => {
    const { onChange: onRegisterChange, ...otherFields } = register;
    const onChange = (e: any) => {
        if (onChangeCallback) {
            onChangeCallback();
        }
        onRegisterChange(e);
    }
    
    return (
        <>
            <PropertyName text={label}/>
            <ValidatedProperty errorMessage={error}>
                <select {...otherFields} onChange={e => onChange(e)}>
                    {isDefaultSelected && <option disabled value={defaultValue}>{defaultValue}</option>}
                    {options.map((option, i) => (
                        <option key={i} value={option.id}>{option.value}</option>
                    ))}
                </select>
            </ValidatedProperty>
        </>
    )
}