import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useState, useCallback, useMemo } from 'react';
import { ProtectedPage } from "../../components/pages";
import { TabsControl } from "../../components/tabs";
import { MetadataTab, DatasetRowsTab } from "./components";
import { EditSchemaTab } from "./preprocessing/EditSchemaTab";
import { TabInfo } from "../../components/tabs";
import { DatasetMetadata } from "../../model/datasets/DatasetMetadata";
import DatasetPreprocessingSettings from "../../model/datasets/preprocessing/DatasetPreprocessingSettings";
import { DatasetRepository } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import DatasetColumnTracker from './preprocessing/DatasetColumnTracker';
import { ColumnDataType, mapColumnTypeIntoString } from '../../model/datasets/preprocessing';
import { HeaderContainer, PageTitle, StyledButton } from '../../components';
import { mapAggregateFunctionIntoString, mapFillingTechniqueIntoString } from '../../model/datasets';

interface ProcessDatasetPageProps {
    metadata: DatasetMetadata;
}

const ProcessDatasetPage = ({metadata}: ProcessDatasetPageProps) => { 
    const { id } = useParams();
    const datasetId = useMemo(() => parseInt(id ?? ''), [id]);
    const [columns, setColumns] = useState<DatasetColumnTracker[]>([]);
    const navigate = useNavigate();

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

    // const schema: yup.ObjectSchema<DatasetPreprocessingSettings> = yup.object().shape({
    //     columnsSettings: yup.object().
    //     hyperparameters: yup.array().ensure().of(yup.object({
    //         id: yup.number().integer().required(),
    //         value: yup.string().required()
    //     })).required(),
    //     datasetParams: yup.object().shape({
    //         targetColumn: yup.string().min(1, 'Target must be selected!').required('Required'),
    //         trainTestSplit: yup.number().moreThan(0, 'Must be greater than 0').lessThan(1, 'Must be less than 1').required('Required'),
    //     }).required(),
    // });

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
        let request: any = {}

        for (const column in data.columnsSettings) {
            const settings = data.columnsSettings[column];
            const aggregateFunction = settings.emptiesStrategy.aggregateFunction;

            request[column] = {
                columnType: mapColumnTypeIntoString(settings.columnType),
                emptiesStrategy: {
                    technique: mapFillingTechniqueIntoString(settings.emptiesStrategy.technique),
                    constantValue: settings.emptiesStrategy.constantValue,
                    aggregateFunction: aggregateFunction ? mapAggregateFunctionIntoString(aggregateFunction) : undefined
                }
            }
        }

        DatasetRepository.changeSchema(datasetId, request)
            .then(() => navigate('/datasets'))
            .catch(() => alert('Error during preprocessing dataset. Please try again later.'))
    };
    
    return (
        <ProtectedPage>
             <form onSubmit={handleSubmit(submit, error => console.log(error))}>
                <HeaderContainer>
                    <PageTitle title='Dataset preprocessing'/>
                    <StyledButton type='submit'>Submit</StyledButton>
                </HeaderContainer>
            </form>
            <TabsControl tabs={tabs} defaultTab="Metadata"/>
        </ProtectedPage>
    )
}

export default ProcessDatasetPage;