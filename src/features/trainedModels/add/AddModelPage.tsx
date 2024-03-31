import { useState, useCallback } from 'react';
import styled from 'styled-components';
import * as Accordion from '@radix-ui/react-accordion';
import { useNavigate } from 'react-router-dom';
import ProtectedPage from "../../../components/pages/ProtectedPage"
import { PageTitle } from "../../../components"
import { AccordionItem } from '../../../components/accordion/AccordionItem';
import { MainInfoForm } from './forms/MainInfoForm';
import { DatasetParameters, MainInfo } from './MainInfoInterface';
import HyperparametersForm from './forms/HyperparametersForm';
import ScrollContainer from '../../../components/scroll/ScrollElements';
import { DatasetParamsForm } from './forms/DatasetParametersForm';
import TrainedModelsRepository from '../../../api/trainedModels/TrainedModelsRepository';
import ModelTrainParams from '../../../model/ModelTrainParams';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const FormContainer = styled.div`
    width: 100%;
    height: calc(100% - 70px);
    background-color: white;
    margin-top: 25px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 15px 25px;
`

interface ParameterValue {
    id: string;
    value: string;
}

const AddModelPage = () => {
    const navigate = useNavigate();
    const [mainInfo, setMainInfo] = useState<MainInfo | null>(null);
    const [values, setValues] = useState<ParameterValue[]>([]);
    const [datasetParams, setDatasetParams] = useState<DatasetParameters | null>(null);

    const submit = useCallback(async () => {
        const hyperparams: any = {};
        for (const val of values) {
            hyperparams[val.id] = val.value;
        }

        await TrainedModelsRepository.addModelForTraining(new ModelTrainParams(
            mainInfo?.name ?? '',
            {
                modelID: mainInfo?.modelId ?? '',
                hyperparameterValues: hyperparams
            },
            {
                datasetID: mainInfo?.datasetId ?? '',
                targetColumn: datasetParams?.targetColumn ?? '',
                trainTestSplit: datasetParams?.trainTestSplit ?? 0
            }
        ))
    }, [mainInfo, values, datasetParams]);

    return (
        <ProtectedPage>
            <HeaderContainer>
                <PageTitle title='Train the model'/>
                <button onClick={async () => {
                    await submit();
                    navigate('/trained-models')
                }}>Submit</button>
            </HeaderContainer>
            <FormContainer>
                <ScrollContainer>
                    <Accordion.Root type="multiple" defaultValue={['main']}>
                    <AccordionItem
                            value='main'
                            title='Main info'
                        >
                            <MainInfoForm mainInfo={mainInfo} setMainInfo={setMainInfo}/>
                        </AccordionItem>

                        {!mainInfo || mainInfo.modelId.length === 0 ? null : (
                            <AccordionItem
                                value='hyperparameters'
                                title='Hyperparameters'
                            >
                                <HyperparametersForm 
                                    modelId={mainInfo.modelId}
                                    values={values}
                                    setValues={setValues}
                                />
                            </AccordionItem>)
                        }

                        {!mainInfo || mainInfo.datasetId.length === 0 ? null : (
                            <AccordionItem
                                value='dataset'
                                title='Dataset parameters'
                            >
                                <DatasetParamsForm
                                    datasetId={mainInfo.datasetId}
                                    datasetParams={datasetParams}
                                    setDatasetParams={setDatasetParams}
                                />
                            </AccordionItem>)
                        }
                    </Accordion.Root>
                </ScrollContainer>
            </FormContainer>
        </ProtectedPage>
    )
}

export default AddModelPage;