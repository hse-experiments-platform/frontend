import styled from "styled-components"
import * as Tabs from '@radix-ui/react-tabs';
import ScrollContainer from "../scroll/ScrollElements";

export interface TabInfo {
    name: string;
    component: JSX.Element;
}

interface ScrollableTabProps {
    tab: TabInfo;
}

const TabsContent = styled(Tabs.Content)`
    width: 100%;
    background-color: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid black;
    padding: 25px 30px;

    @media (min-height: 400px) {
        height: 350px;
    }

    @media (min-height: 1000px) {
        height: 800px;
    }
`

export const ScrollableTab = ({tab}: ScrollableTabProps) => {
    return (
        <TabsContent value={tab.name}>
            <ScrollContainer>
                {tab.component}
            </ScrollContainer>
        </TabsContent>
    )
}