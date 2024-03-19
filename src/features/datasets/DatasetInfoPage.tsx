import styled from "styled-components";
import ProtectedPage from "../../components/pages/ProtectedPage";
import * as Tabs from '@radix-ui/react-tabs';
import { MetadataTab, DatasetRowsTab } from "./components";
import { TabsRoot } from "@radix-ui/themes";

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
`

export const DatasetInfoPage = () => {
    
    return (
        <ProtectedPage>
           <Root defaultValue='metadata'>
                <TriggersList> 
                    <Trigger value='metadata'>
                        Metadata
                    </Trigger>
                    <Trigger value='rows'>
                        Dataset rows
                    </Trigger>
                </TriggersList>
                <TabsSeparator/>
                <Content value='metadata'>
                    <MetadataTab/>
                </Content>
                <Content value='rows'>
                    <DatasetRowsTab/>
                </Content>
            </Root>
        </ProtectedPage>
    )
}