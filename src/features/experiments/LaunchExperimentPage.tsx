import { useState, useCallback } from 'react';
import styled from 'styled-components';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from 'react-hook-form';
import { ProtectedPage } from "../../components/pages";
import { PageTitle } from '../../components';
import { PropertyContainer, LabeledInput } from '../../components/descriptions';
import { LabeledSelector } from '../../components/descriptions/LabeledSelector';
import useRequest from '../../hooks/useRequest';
import { DatasetRepository } from '../../api';
import TrainedModelsRepository from '../../api/trainedModels/TrainedModelsRepository';
import { useNavigate } from 'react-router-dom';
import { Option } from '../../model';
import ExperimentParams from './model/ExperimentParams';
import ExperimentsRepository from '../../api/experiments/ExperimentsRepository';
import { HeaderContainer, StyledButton, StyledForm, InputsContainer } from '../../components';

interface NewExperimentParams {
    name: string;
    datasetId: string;
    trainedModelId: string;
}

const newExperimentSchema: yup.ObjectSchema<NewExperimentParams> = yup.object().shape({
    name: yup.string().min(1, 'Name couldn`t be empty!').required('Required'),
    datasetId: yup.string().min(1, 'Dataset must be selected!').required('Required'),
    trainedModelId: yup.string().min(1, 'Model must be selected!').required('Required'),
});

const LaunchExperimentPage = () => {
    const navigate = useNavigate();
    const { register,
        handleSubmit,
        watch,
        formState: {
            errors
        },
    } = useForm<NewExperimentParams>({
        defaultValues: {
            datasetId: '',
            trainedModelId: '',
        },
        resolver: yupResolver(newExperimentSchema)
    });
    const [datasetOptions, setDatasetOptions] = useState<Option[]>([]);
    const [modelOptions, setModelOptions] = useState<Option[]>([]);

    const fetchDataset = useCallback(async () => {
        const response = await DatasetRepository.getDatasetForModel();
        const options: Option[] = response.map(r => ({
            id: r.id.toString(),
            value: r.name
        }));
        setDatasetOptions(options);
    }, [setDatasetOptions]);
    useRequest(fetchDataset);

    const fetchModels = useCallback(async () => {
            const response = await TrainedModelsRepository.getModelsListForProblem();
            const options: Option[] = response.map(r => ({
                id: r.launchID.toString(),
                value: r.name
            }));
            setModelOptions(options);
    }, [setModelOptions]);
    useRequest(fetchModels);

    const submit: SubmitHandler<NewExperimentParams> = async (data) => {
        await ExperimentsRepository.launchExperiment(new ExperimentParams(
            data.name, data.datasetId, data.trainedModelId
        ))
        .then(_ => navigate('/experiments'))
        .catch(_ => alert("Error during experiment launch. Try again later"));
    };

    return (
        <ProtectedPage>
            <StyledForm onSubmit={handleSubmit(submit)}>
                <HeaderContainer>
                    <PageTitle title='Launch experiment'/>
                    <StyledButton type='submit'>Submit</StyledButton>
                </HeaderContainer>

                <InputsContainer>
                    <PropertyContainer>
                        <LabeledInput label='Experiment name' register={register('name')} error={errors?.name?.message}/>

                        <LabeledSelector
                            label='Trained model'
                            register={register('trainedModelId')}
                            options={modelOptions}
                            defaultValue=''
                            isDefaultSelected={watch('trainedModelId') === ''}
                            error={errors?.trainedModelId?.message}
                        />

                        {watch('trainedModelId') && <LabeledSelector
                            label='Dataset' 
                            register={register('datasetId')}
                            options={datasetOptions}
                            defaultValue=''
                            isDefaultSelected={watch('datasetId') === ''}
                            error={errors?.datasetId?.message}
                        />}
                    </PropertyContainer>
                </InputsContainer>
            </StyledForm>
        </ProtectedPage>
    )
}

export default LaunchExperimentPage;