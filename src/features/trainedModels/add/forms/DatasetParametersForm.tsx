import { useState, useCallback } from 'react';
import { PropertyContainer, Option, LabeledInput } from '../../../../components/descriptions';
import useRequest from '../../../../hooks/useRequest';
import DatasetRepository from '../../../../api/datasets/DatasetRepository';
import { LabeledSelector } from '../../../../components/descriptions/LabeledSelector';

interface DatasetParamsFormProps {
    datasetId: string;
    register: any;
    errors: any;
    watch: any;
}

export const DatasetParamsForm = ({datasetId, register, watch, errors}: DatasetParamsFormProps) => {
    const [columnOptions, setColumnOptions] = useState<Option[]>([]);
    const targetColumn: string = watch("datasetParams.targetColumn");

    const fetchDatasetSchema = useCallback(async () => {
        const response = await DatasetRepository.getDatasetSchema(parseInt(datasetId));
        const options: Option[] = response.map(r => ({
            id: r.name,
            value: r.name
        }));
        setColumnOptions(options);
    }, [setColumnOptions]);
    useRequest(fetchDatasetSchema, false);

    return (
        <PropertyContainer>
            <LabeledInput
                label='Train test ratio'
                register={register("datasetParams.trainTestSplit")}
                error={errors?.trainTestSplit?.message}
            />
            <LabeledSelector
                label='Target column'
                register={register("datasetParams.targetColumn")}
                options={columnOptions}
                defaultValue=''
                isDefaultSelected={targetColumn === ''}
                error={errors?.targetColumn?.message}
            />
        </PropertyContainer>
    )
}