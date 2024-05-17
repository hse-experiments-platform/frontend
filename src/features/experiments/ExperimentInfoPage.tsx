import { useState, useCallback } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { ProtectedPage } from "../../components/pages";
import { PageTitle, HeaderContainer } from '../../components';
import { PropertyContainer, PropertyInput, PropertyName } from '../../components/descriptions';
import ExperimentInfo from './model/ExperimentInfo';
import ExperimentsRepository from '../../api/experiments/ExperimentsRepository';
import useRequest from '../../hooks/useRequest';
import FileDownloader from '../../components/FileDownloader';

const ContentContainer = styled.div`
    width: 100%;
    height: calc(100% - 70px);
    background-color: white;
    margin-top: 25px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 15px 25px;
`

const ExperimentInfoPage = () => {
    const { id } = useParams();
    const [experiment, setExperiment] = useState<ExperimentInfo | null>(null);
    
    const fetchExperiment = useCallback(async () => {
        if (!id) return;
        const response = await ExperimentsRepository.getExperimentInfo(id);
        setExperiment(response)
    }, [id, setExperiment]);
    useRequest(fetchExperiment);

    return (
        <ProtectedPage>
            <HeaderContainer>
                <PageTitle title='Experiment'/>
                <FileDownloader
                    filename='Result.csv'
                    getUrl={async () => await ExperimentsRepository.getExperimentResultUrl(id ?? '')}
                />
            </HeaderContainer>
            <ContentContainer>
                <PropertyContainer>
                    <PropertyName text='Experiment name'/>
                    <PropertyInput disabled={true} value={experiment?.name}/>

                    <PropertyName text='Status'/>
                    <PropertyInput disabled={true} value={experiment?.status}/>

                    <PropertyName text='Dataset name'/>
                    <PropertyInput disabled={true} value={experiment?.datasetName}/>

                    <PropertyName text='Target'/>
                    <PropertyInput disabled={true} value={experiment?.target}/>
                </PropertyContainer>
            </ContentContainer>
        </ProtectedPage>
    )
}

export default ExperimentInfoPage;