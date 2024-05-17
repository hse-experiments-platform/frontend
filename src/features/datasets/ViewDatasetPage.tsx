import { useMemo } from 'react';
import { ProtectedPage } from "../../components/pages";
import { TabsControl } from "../../components/tabs";
import { MetadataTab, DatasetRowsTab, SchemaTab } from "./components";
import { TabInfo } from "../../components/tabs";
import { DatasetMetadata, isDatasetLoaded } from "../../model/datasets/DatasetMetadata";

interface ViewDatasetPageProps {
    metadata: DatasetMetadata | null;
}

const ViewDatasetPage = ({metadata}: ViewDatasetPageProps) => { 
    const metadataTab: TabInfo = {
        name: 'Metadata',
        component: (<MetadataTab metadata={metadata}/>)
    }
    const schemaTab: TabInfo = {
        name: 'Schema',
        component: (
            <SchemaTab metadata={metadata}/>
        )
    }
    const rowsTab: TabInfo = {
        name: 'Dataset rows',
        component: (
            <DatasetRowsTab/>
        )
    }
    const tabs = useMemo(() => metadata && isDatasetLoaded(metadata.status)
         ? [metadataTab, schemaTab, rowsTab]
         : [metadataTab],
    [metadata, metadataTab, schemaTab, rowsTab]);
    
    return (
        <ProtectedPage>
           <TabsControl tabs={tabs} defaultTab="Metadata"/>
        </ProtectedPage>
    )
}

export default ViewDatasetPage;