import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import ModelHyperparameter from '../../model/ModelHyperparameter';
import ModelsRepository from '../../../../api/models/ModelsRepository';
import useRequest from '../../../../hooks/useRequest';
import { LabeledInput, PropertyContainer } from '../../../../components/descriptions';

interface HyperparametersFormProps {
    modelId: string;
    register: any;
    resetField: any;
    watch: any;
}

const HyperparametersForm = ({register, resetField, watch, modelId}: HyperparametersFormProps) => {
    const formHyperparameters = watch("hyperparameters")
    const [hyperparameters, setHyperparameters] = useState<ModelHyperparameter[]>([]);

    const fetchHyperparameters = useCallback(async () => {
        const response = await ModelsRepository.getHyperparameters(modelId);
        setHyperparameters(response);
        if (formHyperparameters)
            return;
        
        for (const hyperparameter of response) {
            resetField(`hyperparameters.${hyperparameter.id}`, {
                defaultValue: {
                    id: hyperparameter.id,
                    value: hyperparameter.defaultValue
                }
            })
        }
    }, [modelId, resetField]);
    useRequest(fetchHyperparameters, false);

    return (
        <PropertyContainer>
            {hyperparameters.map(parameter => (
                <>
                    <LabeledInput
                        label={parameter.name}
                        register={register(`hyperparameters.${parameter.id}.value`)}
                    />
                </>
            ))}
        </PropertyContainer>
    )
}

export default HyperparametersForm;