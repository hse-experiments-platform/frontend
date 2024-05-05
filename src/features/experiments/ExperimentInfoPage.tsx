import { useState, useCallback } from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { ProtectedPage } from "../../components/pages";
import { PageTitle } from '../../components';
import { LabeledInput, PropertyContainer, PropertyInput, PropertyName } from '../../components/descriptions';
import ExperimentInfo from '../../model/experiments/ExperimentInfo';
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

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ExperimentInfoPage = () => {
    const { id } = useParams();
    const [experiment, setExperiment] = useState<ExperimentInfo | null>(null);
    const url = 'https://docs.google.com/spreadsheets/d/1jFGYlAbpXrhF17_EVzXXxe9vInfZy2VRjlrw81K7lZI/export?format=csv&id=1jFGYlAbpXrhF17_EVzXXxe9vInfZy2VRjlrw81K7lZI&gid=683971698';

    const fetchExperiment = useCallback(async () => {
        const modelId: number = parseInt(id ?? '');
        const response = await ExperimentsRepository.getExperimentInfo();
        setExperiment(response)
    }, [id, setExperiment]);
    useRequest(fetchExperiment);

    return (
        <ProtectedPage>
            <HeaderContainer>
                <PageTitle title='Experiment'/>
                <FileDownloader filename='Result.csv' url={url}/>
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

                    <PropertyName text='Start Date time'/>
                    <PropertyInput disabled={true} value={experiment?.startDateTime.toDateString()}/>
                </PropertyContainer>
            </ContentContainer>
        </ProtectedPage>
    )
}

export default ExperimentInfoPage;