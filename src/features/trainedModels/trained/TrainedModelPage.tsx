import { useState, useCallback, useMemo } from 'react';
import { useParams } from "react-router-dom";
import useRequest from '../../../hooks/useRequest';
import { TrainedModel } from '../model';
import TrainedModelsRepository from '../../../api/trainedModels/TrainedModelsRepository';
import { ProtectedPage } from '../../../components/pages';
import { PageTitle } from '../../../components';
import styled from 'styled-components';
import TrainedModelMetrics from '../metrics/TrainedModelMetrics';
import ScrollContainer from '../../../components/scroll/ScrollElements';
import MainInfoBlock from './MainInfoBlock';
import { AccordionItem } from '../../../components/accordion/AccordionItem';
import * as Accordion from '@radix-ui/react-accordion';
import ImagesBlock from './ImagesBlock';
import NumberMetricsBlock from './NumberMetricsBlock';

const ContentContainer = styled.div`
    width: 100%;
    height: calc(100% - 55px);
    background-color: white;
    margin-top: 25px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 15px 25px;
`

const TrainedModelPage = () => {
    const { id } = useParams();
    const modelId: number = useMemo(() => parseInt(id ?? ''), [id]);
    const [trainedModel, setTrainedModel] = useState<TrainedModel | null>(null);
    const [metrics, setMetrics] = useState<TrainedModelMetrics | null>();

    const fetchModelInfo = useCallback(async () => {
        const response = await TrainedModelsRepository.getTrainedModel(modelId);
        setTrainedModel(response);
    }, [modelId, setTrainedModel]);
    useRequest(fetchModelInfo);

    const fetchMetrics = useCallback(async () => {
        if (!trainedModel)
            return;

        const response = await TrainedModelsRepository.getMetricsForTrainedModel(modelId);
        setMetrics(response);
    }, [trainedModel, setMetrics]);
    useRequest(fetchMetrics);

    return (
        <ProtectedPage>
            <PageTitle title='Trained model'/>
            <ContentContainer>
                <ScrollContainer>
                    <Accordion.Root type="multiple" defaultValue={['main']}>
                        <AccordionItem value='main' title='Main info'>
                            {trainedModel && <MainInfoBlock trainedModel={trainedModel}/>}
                        </AccordionItem>

                        {trainedModel?.trainStatus !== 'LaunchStatusError' && (
                            <>
                                <AccordionItem value='test' title='Test metrics'>
                                    {metrics?.test && <NumberMetricsBlock metrics={metrics.test}/>}
                                </AccordionItem>

                                <AccordionItem value='cv' title='Cross validation metrics'>
                                    {metrics?.cv && <ImagesBlock metrics={metrics.cv}/>}
                                </AccordionItem>

                                <AccordionItem value='feat' title='Feature importance'>
                                    {metrics?.imageImportanceVisualization && <ImagesBlock metrics={metrics.imageImportanceVisualization}/>}
                                </AccordionItem>
                            </>
                        )}
                    </Accordion.Root>
                </ScrollContainer>
            </ContentContainer>
        </ProtectedPage>
    )
}

export default TrainedModelPage;

/* 

<AccordionItem value='features' title='Feature importance metrics'>
                            {metrics?.featureImportanceVisualization && <ImagesBlock metrics={metrics.featureImportanceVisualization}/>}
                        </AccordionItem>
{trainedModel?.trainStatus === 'TrainStatusDone' && (<>
                    <PageTitle title='Metrics'/>
                        <Container>
                            <PropertyContainer>
                                {[{name: 'h', value: 'p'}].map(m => (
                                    <>
                                        <PropertyName text={m.name}/>
                                        <PropertyInput disabled={true} value={m.value}/>
                                    </>
                                ))}
                            </PropertyContainer>  
                        </Container>
            
                </>)}
*/