import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import ModelHyperparameter from '../../../../model/ModelHyperparameter';
import ModelsRepository from '../../../../api/models/ModelsRepository';
import useRequest from '../../../../hooks/useRequest';
import { PropertyContainer, PropertyInput, PropertyName } from '../../../../components/descriptions';
import { ParameterValue } from '../MainInfoInterface';

interface HyperparametersFormProps {
    modelId: string;
    values: ParameterValue[];
    setValues: Dispatch<SetStateAction<ParameterValue[]>>;
}

const HyperparametersForm = ({modelId, values, setValues}: HyperparametersFormProps) => {
    const [hyperparameters, setHyperparameters] = useState<ModelHyperparameter[]>([]);

    const fetchHyperparameters = useCallback(async () => {
        const response = await ModelsRepository.getHyperparameters(modelId);
        setHyperparameters(response);
    }, [modelId, setHyperparameters]);
    useRequest(fetchHyperparameters, false);

    const onDefault = (parameter: ModelHyperparameter): string => {
        const result = values.find(v => v.id === parameter.id)?.value;
        return result ?? parameter.defaultValue;
    }

    const onUpdate = (parameterId: string, newValue: string) => {
        const without = values.filter(v => v.id !== parameterId);
        setValues([...without, {
            id: parameterId,
            value: newValue
        }])
    }

    return (
        <PropertyContainer>
            {hyperparameters.map(parameter => (
                <>
                    <PropertyName text={parameter.name}/>
                    <PropertyInput value={onDefault(parameter)} setValue={(newVal:string) => onUpdate(parameter.id, newVal)}/>
                </>
            ))}
        </PropertyContainer>
    )
}

export default HyperparametersForm;