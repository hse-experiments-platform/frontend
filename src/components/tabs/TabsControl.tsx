import { useState } from 'react';
import { TabsRoot } from "@radix-ui/themes";
import * as Tabs from '@radix-ui/react-tabs';
import styled from 'styled-components';
import { ScrollableTab, TabInfo } from './ScrollableTab';

interface TabsControlProps {
    defaultTab: string;
    tabs: TabInfo[];
}

const TabsList = styled(Tabs.List)`
    display: flex;
    gap: 10px;
`

const TabsTrigger = styled(Tabs.Trigger)`
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

export const TabsControl = ({tabs, defaultTab}: TabsControlProps) => {
    const [activeTabValue, setActiveTabValue] = useState<string>(defaultTab);

    return (
        <TabsRoot value={activeTabValue} onValueChange={(val: string) => setActiveTabValue(val)}>
            <TabsList> 
                {tabs.map(tab => (
                    <TabsTrigger value={tab.name}>
                        {tab.name}
                    </TabsTrigger>
                ))}
            </TabsList> 

            <TabsSeparator/>

            {tabs.map(tab => (<ScrollableTab tab={tab}/>))}
        </TabsRoot>
    )
}