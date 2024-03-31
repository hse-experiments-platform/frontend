export interface Option {
    id: string;
    value: string;
}

interface PropertySelectorProps {
    selectedId?: string;
    selectOption?: (newSelectedId: string) => void;
    defaultValue?: string;
    options: Option[];
}

export const PropertySelector = ({options, selectedId, defaultValue="", selectOption=() => {}}: PropertySelectorProps) => {
    const useDefault = !selectedId || selectedId.length === 0  || selectedId === defaultValue;
    
    return (
        <select value={useDefault ? defaultValue : selectedId} onChange={e => selectOption(e.target.value)}>
            {useDefault ? <option disabled value={defaultValue}>{defaultValue}</option> : null}
            {options.map(option => (
                <option value={option.id}>{option.value}</option>
            ))}
        </select>
    )
}