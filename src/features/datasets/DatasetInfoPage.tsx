import styled from "styled-components";
import { useState, useCallback } from 'react';
import ProtectedPage from "../../components/pages/ProtectedPage";
import * as Tabs from '@radix-ui/react-tabs';
import { MetadataTab, DatasetRowsTab, SchemaTab } from "./components";
import { TabsRoot } from "@radix-ui/themes";
import DatasetMetadata from "../../model/datasets/DatasetMetadata";
import DatasetRepository from "../../api/datasets/DatasetRepository";
import { useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";

const Root = styled(TabsRoot)`
`

const TriggersList = styled(Tabs.List)`
    display: flex;
    gap: 10px;
`

const Trigger = styled(Tabs.Trigger)`
    height: 37px;
    width: 125px;
    color: #C9C9C9;
    font-size: 15px;
    background-color: #03256C;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border: 1px solid black;
    border-bottom: 0;

    &[data-state='active'] {
        color: white;
        background-color: #0245D1;
    }
`

const TabsSeparator = styled.div`
    width: 100%;
    height: 5px;
    background-color: #0245D1;
`

const Content = styled(Tabs.Content)`
    width: 100%;
    height: 400px;
    background-color: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid black;
    padding: 25px 30px;
`

export const DatasetInfoPage = () => {
    const { id } = useParams();
    const [activeTabValue, setActiveTabValue] = useState<string>('metadata');
    const [metadata, setMetadata] = useState<DatasetMetadata | null>(null);
    
    const fetchMetadata = useCallback(async () => {
        const datasetId: number = parseInt(id ?? '');
        const response = await DatasetRepository.getDatasetMetadata(datasetId);
        setMetadata(response);
    }, [id, setMetadata]);
    useRequest(fetchMetadata);
    
    return (
        <ProtectedPage>
           <Root value={activeTabValue} onValueChange={(val: string) => setActiveTabValue(val)}>
           <TriggersList> 
                <Trigger value='metadata'>
                    Metadata
                </Trigger>
                {metadata?.status !== 'LoadingError' && (
                    <>
                        <Trigger value='schema'>
                            Schema
                        </Trigger>
                        <Trigger value='rows'>
                            Dataset rows
                        </Trigger>
                    </>
                )}
            </TriggersList>
            <TabsSeparator/>
            <Content value='metadata'>
                <MetadataTab metadata={metadata}/>
            </Content>
            <Content value='schema'>
                <SchemaTab metadata={metadata}/>
            </Content>
            <Content value='rows'>
                <DatasetRowsTab/>
            </Content>
            </Root>
        </ProtectedPage>
    )
}