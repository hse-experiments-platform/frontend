import { useState, useCallback } from 'react';
import { PropertyContainer, LabeledInput } from '../../../../components/descriptions';
import { Option } from '../../../../model';
import useRequest from '../../../../hooks/useRequest';
import { DatasetRepository } from '../../../../api';
import ProblemsRepository from '../../../../api/problems/ProblemsRepository';
import ModelsRepository from '../../../../api/models/ModelsRepository';
import { LabeledSelector } from '../../../../components/descriptions/LabeledSelector';

interface MainInfoFormProps {
    watch: any;
    register: any;
    resetField: any;
    errors: any;
}

export const MainInfoForm = ({ register, watch, resetField, errors }: MainInfoFormProps) => {
    const problemId: string = watch("mainInfo.problemId");
    const modelId = watch("mainInfo.modelId");
    const datasetId = watch("mainInfo.datasetId");

    const [datasetOptions, setDatasetOptions] = useState<Option[]>([]);
    const [problemOptions, setProblemOptions] = useState<Option[]>([]);
    const [modelOptions, setModelOptions] = useState<Option[]>([]);

    const fetchDataset = useCallback(async () => {
        const response = await DatasetRepository.getReadyDatasets();
        const options: Option[] = response.map(r => ({
            id: r.id.toString(),
            value: r.name
        }));
        setDatasetOptions(options);
    }, [setDatasetOptions]);
    useRequest(fetchDataset);

    const fetchProblems = useCallback(async () => {
        const response = await ProblemsRepository.getProblemsList();
        const options: Option[] = response.map(r => ({
            id: r.id,
            value: r.name
        }));
        setProblemOptions(options);
    }, [setProblemOptions]);
    useRequest(fetchProblems);

    const fetchModels = useCallback(async () => {
        if (problemId.length !== 0) {
            const response = await ModelsRepository.getModelsList(problemId);
            const options: Option[] = response.map(r => ({
                id: r.modelId,
                value: r.name
            }));
            setModelOptions(options);
        }
    }, [setModelOptions, problemId]);
    useRequest(fetchModels);

    return (
        <PropertyContainer>
            <LabeledInput label='Trained model name' register={register('mainInfo.name')} error={errors?.name?.message}/>
            <LabeledSelector
                label='Problem'
                register={register("mainInfo.problemId")}
                onChangeCallback={() => {resetField("mainInfo.modelId"); resetField("hyperparameters", {defaultValue: null})}}
                options={problemOptions}
                defaultValue=''
                isDefaultSelected={problemId === ''}
                error={errors?.problemId?.message}
            />
            
            {problemId.length > 0 &&
                (
                    <LabeledSelector
                        label='Model'
                        register={register('mainInfo.modelId')}
                        onChangeCallback={() => resetField("hyperparameters")}
                        options={modelOptions}
                        defaultValue=''
                        isDefaultSelected={modelId === ''}
                        error={errors?.modelId?.message}
                    />
                )
            }

            <LabeledSelector
                label='Dataset' 
                register={register('mainInfo.datasetId')}
                onChangeCallback={() => resetField("datasetParams")}
                options={datasetOptions}
                defaultValue=''
                isDefaultSelected={datasetId === ''}
                error={errors?.datasetId?.message}
            />           
        </PropertyContainer>
    )
}