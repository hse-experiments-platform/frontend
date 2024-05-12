import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useCallback, useMemo } from 'react';
import { ProtectedPage } from "../../components/pages";
import { TabsControl } from "../../components/tabs";
import { MetadataTab, DatasetRowsTab } from "./components";
import { EditSchemaTab } from "./preprocessing/EditSchemaTab";
import { TabInfo } from "../../components/tabs";
import DatasetMetadata from "../../model/datasets/DatasetMetadata";
import DatasetPreprocessingSettings from "../../model/datasets/preprocessing/DatasetPreprocessingSettings";
import { DatasetRepository } from "../../api";
import { useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import DatasetColumnTracker from './preprocessing/DatasetColumnTracker';
import { ColumnDataType } from '../../model/datasets/preprocessing';
import { HeaderContainer, PageTitle, StyledButton } from '../../components';

interface ProcessDatasetPageProps {
    metadata: DatasetMetadata;
}

const ProcessDatasetPage = ({metadata}: ProcessDatasetPageProps) => { 
    const { id } = useParams();
    const datasetId = useMemo(() => parseInt(id ?? ''), [id]);
    const [columns, setColumns] = useState<DatasetColumnTracker[]>([]);

    const fetchColumns = useCallback(async () => {
        const response = await DatasetRepository.getDatasetSchema(datasetId);
        setColumns(response.map(column => ({ datasetColumn: column, active: true })));

        const defaults = DatasetPreprocessingSettings.createDefaultSettings(response);
        reset(defaults);
    }, [datasetId, setColumns]);
    useRequest(fetchColumns);

    const changeColumnState = useCallback((columnName: string, isToActivate: boolean) => {
        setColumns(columns => columns.map(column => column.datasetColumn.name === columnName ? {...column, active: isToActivate} : column));
        setValue(`columnsSettings.${columnName}.columnType`, isToActivate ? ColumnDataType.Undefined : ColumnDataType.Delete);
    }, [setColumns]);

    const { register, handleSubmit, reset, watch, setValue } = useForm<DatasetPreprocessingSettings>();

    const metadataTab: TabInfo = {
        name: 'Metadata',
        component: (<MetadataTab metadata={metadata}/>)
    }
    const editSchemaTab: TabInfo = {
        name: 'Edit schema',
        component: (
            <EditSchemaTab
                columns={columns}
                register={(columnPrefix: string) => register(`columnsSettings.${columnPrefix}`)}
                changeColumnState={changeColumnState}
                watch={(columnPrefix: string) => watch(`columnsSettings.${columnPrefix}`)}
            />
        )
    }
    const rowsTab: TabInfo = {
        name: 'Dataset rows',
        component: (
            <DatasetRowsTab/>
        )
    }
    const tabs = useMemo(() => metadata?.status !== 'LoadingError'
         ? [metadataTab, editSchemaTab, rowsTab]
         : [metadataTab],
    [metadata, metadataTab, editSchemaTab, rowsTab]);

    const submit: SubmitHandler<DatasetPreprocessingSettings> = async (data) => {
        console.log(data)
    };
    
    return (
        <ProtectedPage>
             <form onSubmit={handleSubmit(submit, error => console.log(error))}>
                <HeaderContainer>
                    <PageTitle title='Dataset transform'/>
                    <StyledButton type='submit'>Submit</StyledButton>
                </HeaderContainer>
            </form>
            <TabsControl tabs={tabs} defaultTab="Metadata"/>
        </ProtectedPage>
    )
}

export default ProcessDatasetPage;