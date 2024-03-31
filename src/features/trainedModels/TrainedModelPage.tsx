import { useState, useCallback } from 'react';
import { useParams } from "react-router-dom";
import useRequest from '../../hooks/useRequest';
import { TrainedModel } from '../../model/trainedModels';
import TrainedModelsRepository from '../../api/trainedModels/TrainedModelsRepository';
import ProtectedPage from '../../components/pages/ProtectedPage';
import { PageTitle } from '../../components';
import { PropertyContainer, PropertyInput, PropertyName } from '../../components/descriptions';
import styled from 'styled-components';
import Metric from '../../model/metrics/Metric';
import MetricsRepository from '../../api/metrics/MetricsRepository';

const Container = styled.div`
    margin: 15px;
`

const TrainedModelPage = () => {
    const { id } = useParams();
    const [trainedModel, setTrainedModel] = useState<TrainedModel | null>(null);
    const [metrics, setMetrics] = useState<Metric[]>([]);

    const fetchModelInfo = useCallback(async () => {
        const modelId: number = parseInt(id ?? '');
        const response = await TrainedModelsRepository.getTrainedModel(modelId);
        setTrainedModel(response);
    }, [id, setTrainedModel]);
    useRequest(fetchModelInfo);

    const fetchMetrics = useCallback(async () => {
        if (!trainedModel)
            return;

        const response = await MetricsRepository.getTrainingMetricsForModel(trainedModel.launchID);
        setMetrics(response);
    }, [trainedModel, setMetrics]);
    useRequest(fetchMetrics);

    return (
        <ProtectedPage>
            <PageTitle title='Trained model info'/>
            <Container>
                <PropertyContainer>
                    <PropertyName text='Model name'/>
                    <PropertyInput disabled={true} value={trainedModel?.name}/>

                    <PropertyName text='Base model name'/>
                    <PropertyInput disabled={true} value={trainedModel?.baseModelName}/>

                    <PropertyName text='Dataset'/>
                    <PropertyInput disabled={true} value={trainedModel?.trainDatasetName}/>
                </PropertyContainer>
            </Container>
            
            {trainedModel?.trainStatus === 'TrainStatusDone' && (<>
                <PageTitle title='Metrics'/>
                    <Container>
                        <PropertyContainer>
                            {metrics.map(m => (
                                <>
                                    <PropertyName text={m.name}/>
                                    <PropertyInput disabled={true} value={m.value}/>
                                </>
                            ))}
                        </PropertyContainer>  
                    </Container>
        
            </>)}
        </ProtectedPage>
    )
}

export default TrainedModelPage;