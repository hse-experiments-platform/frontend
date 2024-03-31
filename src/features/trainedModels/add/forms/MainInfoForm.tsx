import { useState, Dispatch, SetStateAction, useEffect, useCallback } from 'react';
import { MainInfo } from '../MainInfoInterface';
import { PropertyContainer, PropertyName, PropertyInput, PropertySelector, Option } from '../../../../components/descriptions';
import useRequest from '../../../../hooks/useRequest';
import DatasetRepository from '../../../../api/datasets/DatasetRepository';
import ProblemsRepository from '../../../../api/problems/ProblemsRepository';
import ModelsRepository from '../../../../api/models/ModelsRepository';

interface MainInfoFormProps {
    mainInfo: MainInfo | null;
    setMainInfo: Dispatch<SetStateAction<MainInfo | null>>;
}

export const MainInfoForm = ({mainInfo, setMainInfo}: MainInfoFormProps) => {
    const [name, setName] = useState<string>(mainInfo?.name ?? '');
    const [problemId, setProblemId] = useState<string>(mainInfo?.problemId ?? '');
    const [modelId, setModelId] = useState<string>(mainInfo?.modelId ?? '');
    const [datasetId, setDatasetId] = useState<string>(mainInfo?.datasetId ?? '');
    const [datasetOptions, setDatasetOptions] = useState<Option[]>([]);
    const [problemOptions, setProblemOptions] = useState<Option[]>([]);
    const [modelOptions, setModelOptions] = useState<Option[]>([]);

    useEffect(() => {
        setModelId('');
    }, [problemId])

    useEffect(() => {
        setMainInfo({
            name,
            problemId,
            modelId,
            datasetId
        })
    }, [setMainInfo, name, problemId, modelId, datasetId]);

    const fetchDataset = useCallback(async () => {
        const response = await DatasetRepository.getReadyDatasets();
        const options: Option[] = response.map(r => ({
            id: r.id.toString(),
            value: r.name
        }));
        setDatasetOptions(options);
    }, [setDatasetOptions]);
    useRequest(fetchDataset, false);

    const fetchProblems = useCallback(async () => {
        const response = await ProblemsRepository.getProblemsList();
        const options: Option[] = response.map(r => ({
            id: r.id,
            value: r.name
        }));
        setProblemOptions(options);
    }, [setProblemOptions]);
    useRequest(fetchProblems, false);

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
    useRequest(fetchModels, false);

    return (
        <PropertyContainer>
            <PropertyName text={'Trained model name'}/>
            <PropertyInput value={name} setValue={(newVal:string) => setName(newVal)}/>

            <PropertyName text={'Problem'}/>
            <PropertySelector selectedId={problemId} selectOption={(newId:string) => setProblemId(newId)} options={problemOptions}/>
            
            {problemId.length === 0 ? null : 
                (
                    <>
                        <PropertyName text={'Model'}/>
                        <PropertySelector selectedId={modelId} selectOption={(newId:string) => setModelId(newId)} options={modelOptions}/>
                    </>
                )
            }

            <PropertyName text={'Dataset'}/>
            <PropertySelector selectedId={datasetId} selectOption={(newId:string) => setDatasetId(newId)} options={datasetOptions}/>
        </PropertyContainer>
    )
}