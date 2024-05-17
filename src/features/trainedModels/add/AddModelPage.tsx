import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import * as Accordion from '@radix-ui/react-accordion';
import { useNavigate } from 'react-router-dom';
import { ProtectedPage } from "../../../components/pages";
import { PageTitle } from "../../../components"
import { AccordionItem } from '../../../components/accordion/AccordionItem';
import { MainInfoForm } from './forms/MainInfoForm';
import { DatasetParameters, MainInfo } from './MainInfoInterface';
import HyperparametersForm from './forms/HyperparametersForm';
import ScrollContainer from '../../../components/scroll/ScrollElements';
import { DatasetParamsForm } from './forms/DatasetParametersForm';
import TrainedModelsRepository from '../../../api/trainedModels/TrainedModelsRepository';
import ModelTrainParams from '../model/ModelTrainParams';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const InputsContainer = styled.div`
    width: 100%;
    height: calc(100% - 70px);
    background-color: white;
    margin-top: 25px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 15px 25px;
`

interface Parameter {
    id: number;
    value: string;
}

interface NewModelParams {
    mainInfo: MainInfo;
    hyperparameters: Parameter[] | null;
    datasetParams: DatasetParameters;
}

const newModelSchema: yup.ObjectSchema<NewModelParams> = yup.object().shape({
    mainInfo: yup.object().shape({
        name: yup.string().min(1, 'Name couldn`t be empty!').required('Required'),
        problemId: yup.string().min(1, 'Problem must be selected!').required('Required'),
        modelId:  yup.string().min(1, 'Model must be selected!').required('Required'),
        datasetId: yup.string().min(1, 'Dataset must be selected!').required('Required'),
    }).required(),
    hyperparameters: yup.array().ensure().of(yup.object({
        id: yup.number().integer().required(),
        value: yup.string().required()
    })).required(),
    datasetParams: yup.object().shape({
        targetColumn: yup.string().min(1, 'Target must be selected!').required('Required'),
        trainTestSplit: yup.number().moreThan(0, 'Must be greater than 0').lessThan(1, 'Must be less than 1').required('Required'),
    }).required(),
});

const AddModelPage = () => {
    const navigate = useNavigate();
    const { register,
            handleSubmit,
            watch,
            resetField,
            formState: {
                errors
            },
        } = useForm<NewModelParams>({
        defaultValues: {
            mainInfo: {
                problemId: '',
                modelId: '',
                datasetId: ''
            },
            hyperparameters: null,
            datasetParams: {
                targetColumn: ''
            }
        },
        resolver: yupResolver(newModelSchema)
    });
    
    const modelId = watch("mainInfo.modelId");
    const datasetId = watch("mainInfo.datasetId");

    const submit: SubmitHandler<NewModelParams> = async (data) => {
        const hyperparams: any = {};
        for (const val of (data.hyperparameters ?? [])) {
            if (val) {
                hyperparams[val.id] = val.value;
            }
        }

        await TrainedModelsRepository.addModelForTraining(new ModelTrainParams(
            data.mainInfo?.name,
            {
                modelID: data.mainInfo?.modelId ?? '',
                hyperparameterValues: hyperparams
            },
            {
                datasetID: data.mainInfo?.datasetId,
                targetColumn: data.datasetParams?.targetColumn,
                trainTestSplit: data.datasetParams?.trainTestSplit
            }
        ))
        .then(() =>  navigate('/trained-models'))
        .catch(_ => alert('Error occured. Try again later.'));
    };

    return (
        <ProtectedPage>
            <form onSubmit={handleSubmit(submit, error => console.log(error))}>
                <HeaderContainer>
                    <PageTitle title='Train the model'/>
                    <button type='submit'>Submit</button>
                </HeaderContainer>
                <InputsContainer>
                    <ScrollContainer>
                        <Accordion.Root type="multiple" defaultValue={['main']}>
                        <AccordionItem
                                value='main'
                                title='Main info'
                            >
                                <MainInfoForm
                                    register={register}
                                    watch={watch}
                                    resetField={resetField}
                                    errors={errors.mainInfo}
                                />
                            </AccordionItem>

                            {modelId.length > 0 && (
                                <AccordionItem
                                    value='hyperparameters'
                                    title='Hyperparameters'
                                >
                                    <HyperparametersForm
                                        watch={watch}
                                        modelId={modelId}
                                        register={register}
                                        resetField={resetField}
                                    />
                                </AccordionItem>)
                            }

                            {datasetId.length > 0 && (
                                <AccordionItem
                                    value='dataset'
                                    title='Dataset parameters'
                                >
                                    <DatasetParamsForm
                                        datasetId={datasetId}
                                        register={register}
                                        errors={errors?.datasetParams}
                                        watch={watch}
                                    />
                                </AccordionItem>)
                            }
                        </Accordion.Root>
                    </ScrollContainer>
                    
                </InputsContainer>
            </form>
        </ProtectedPage>
    )
}

export default AddModelPage;