import { useMemo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DatasetRepository } from '../../../api';
import { HeaderContainer, PageTitle, StyledButton } from "../../../components"
import { TabInfo, TabsControl } from "../../../components/tabs";
import { ProtectedPage } from "../../../components/pages"
import useRequest from "../../../hooks/useRequest";
import { SettingsTab } from "./SettingsTab"
import { DatasetColumn } from '../../../model/datasets'
import DatasetTransformSettings from '../../../model/datasets/transform/DatasetTranfromSettings';
import { canBeTransformed } from '../../../model/datasets';

export const TransformDatasetPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const datasetId = useMemo(() => parseInt(id ?? ''), [id]);
    const [columns, setColumns] = useState<DatasetColumn[]>([]);
    
    const fetchMetadata = useCallback(async () => {
        const response = await DatasetRepository.getDatasetMetadata(datasetId);
        
        if (!canBeTransformed(response.status)) {
            navigate(`/datasets/${datasetId}`);
        }
    }, [datasetId]);
    useRequest(fetchMetadata);

    const { register, handleSubmit, reset, watch } = useForm<DatasetTransformSettings>();

    const fetchColumns = useCallback(async () => {
        const response = await DatasetRepository.getDatasetSchema(datasetId);
        setColumns(response);

        const defaults = DatasetTransformSettings.createDefaultSettings(response);
        reset(defaults);
    }, [datasetId, setColumns]);
    useRequest(fetchColumns);

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
                <HeaderContainer>
                    <PageTitle title='Dataset transform'/>
                    <StyledButton type='submit'>Submit</StyledButton>
                </HeaderContainer>
                <TabsControl tabs={[settingsTab]} defaultTab="Settings"/>
            </form>
        </ProtectedPage>
    )
}