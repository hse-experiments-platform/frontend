import { useMemo, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DatasetRepository } from '../../../api';
import { PageTitle } from "../../../components"
import { TabInfo, TabsControl } from "../../../components/tabs";
import { ProtectedPage } from "../../../components/pages"
import useRequest from "../../../hooks/useRequest";
import DatasetColumn from "../../../model/datasets/DatasetColumn";
import { SettingsTab } from "./SettingsTab"
import { AnalyticsTab } from './AnalyticsTab';
import DatasetTransformSettings from '../../../model/datasets/transform/DatasetTranfromSettings';

export const DatasetTransformPage = () => {
    const { id } = useParams();
    const [columns, setColumns] = useState<DatasetColumn[]>([]);

    const { register, handleSubmit, reset, watch } = useForm<DatasetTransformSettings>();

    const fetchColumns = useCallback(async () => {
        const datasetId: number = parseInt(id ?? '');
        const response = await DatasetRepository.getDatasetSchema(datasetId);
        setColumns(response);

        const defaults = DatasetTransformSettings.createDefaultSettings(response);
        reset(defaults);
    }, [id, setColumns]);
    useRequest(fetchColumns);

    const analyticsTab: TabInfo = {
        name: 'Analytics',
        component: (<AnalyticsTab/>)
    }
    const settingsTab: TabInfo = {
        name: 'Settings',
        component: (
            <SettingsTab
                columns={columns}
                register={(columnPrefix: string) => register(`columnsSettings.${columnPrefix}`)}
                watch={watch}
            />
        )
    }

    const submit: SubmitHandler<DatasetTransformSettings> = async (data) => {
        console.log(data)
    };

    return (
        <ProtectedPage>
            <form onSubmit={handleSubmit(submit, error => console.log(error))}>
                <PageTitle title='Dataset transform'/>
                <button type='submit'>Submit</button>
                <TabsControl tabs={[analyticsTab, settingsTab]} defaultTab="Analytics"/>
            </form>
        </ProtectedPage>
    )
}