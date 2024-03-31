import { useState, Dispatch, SetStateAction, useEffect, useCallback } from 'react';
import { DatasetParameters } from '../MainInfoInterface';
import { PropertyContainer, PropertyName, PropertyInput, PropertySelector, Option } from '../../../../components/descriptions';
import useRequest from '../../../../hooks/useRequest';
import DatasetRepository from '../../../../api/datasets/DatasetRepository';

interface DatasetParamsFormProps {
    datasetId: string;
    datasetParams: DatasetParameters | null;
    setDatasetParams: Dispatch<SetStateAction<DatasetParameters | null>>;
}

export const DatasetParamsForm = ({datasetId, datasetParams, setDatasetParams}: DatasetParamsFormProps) => {
    const [target, setTarget] = useState<string>(datasetParams?.targetColumn ?? '');
    const [splitRatio, setSplitRatio] = useState<number>(datasetParams?.trainTestSplit ?? 0);
    const [columnOptions, setColumnOptions] = useState<Option[]>([]);

    useEffect(() => {
        setDatasetParams({
            targetColumn: target,
            trainTestSplit: splitRatio
        })
    }, [setDatasetParams, target, splitRatio]);

    const fetchDatasetSchema = useCallback(async () => {
        const response = await DatasetRepository.getDatasetSchema(parseInt(datasetId));
        const options: Option[] = response.map(r => ({
            id: r.name,
            value: r.name
        }));
        setColumnOptions(options);
    }, [setColumnOptions]);
    useRequest(fetchDatasetSchema, false);

    const onRatioChange = (value: string) => {
        const num = parseFloat(value);
        setSplitRatio(num);
    }

    return (
        <PropertyContainer>
            <PropertyName text={'Train test ratio'}/>
            <PropertyInput value={splitRatio.toString()} setValue={(newVal: string) => onRatioChange(newVal)}/>

            <PropertyName text={'Target column'}/>
            <PropertySelector selectedId={target} selectOption={(newId:string) => setTarget(newId)} options={columnOptions}/>
        </PropertyContainer>
    )
}