import { useMemo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DatasetRepository } from '../../../api';
import { HeaderContainer, PageTitle, StyledButton } from "../../../components"
import { TabInfo, TabsControl } from "../../../components/tabs";
import { ProtectedPage } from "../../../components/pages"
import useRequest from "../../../hooks/useRequest";
import { SettingsTab } from "./SettingsTab"
import { DatasetColumn, mapAggregateFunctionIntoString, mapFillingTechniqueIntoString } from '../../../model/datasets'
import DatasetTransformSettings from '../../../model/datasets/transform/DatasetTranfromSettings';
import { canBeTransformed } from '../../../model/datasets';
import { mapScalingTechniqueIntoString } from '../../../model/datasets/transform/ScalingTechnique';
import { mapEncodingTechniqueIntoString } from '../../../model/datasets/transform/EncodingTechnique';
import { mapOutliersDetectingModeIntoString } from '../../../model/datasets/transform/OutliersDetectingMode';

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
        let request: any = {}

        for (const column in data.columnsSettings) {
            const settings = data.columnsSettings[column];
            const scalingTechnique = settings.scalingTechnique;
            const encodingTechnique = settings.encodingTechnique;
            const outliersDetecting = settings.outliersDetectingStrategy.mode;
            const replacementMode = settings.outliersReplacementStrategy?.mode;
            const aggregateFunc = settings.outliersReplacementStrategy?.aggregationFunction;

            request[column] = {
                scalingTechnique: scalingTechnique ? mapScalingTechniqueIntoString(scalingTechnique) : undefined,
                encodingTechnique: encodingTechnique ? mapEncodingTechniqueIntoString(encodingTechnique) : undefined,
                outlinersDetectingStrategy: {
                    mode: outliersDetecting ? mapOutliersDetectingModeIntoString(outliersDetecting) : undefined,
                    min: settings.outliersDetectingStrategy?.min === undefined ? settings.outliersDetectingStrategy?.min : 0,
                    max: settings.outliersDetectingStrategy?.max === undefined ? settings.outliersDetectingStrategy?.max : 0,
                },
                outlinersReplacementStrategy: {
                    replacementMode: replacementMode ? mapFillingTechniqueIntoString(replacementMode) : undefined,
                    aggregationFunction: aggregateFunc ? mapAggregateFunctionIntoString(aggregateFunc) : undefined,
                    constantValue: settings.outliersReplacementStrategy?.constantValue
                }
            }
        }

        DatasetRepository.transformDataset(datasetId.toString(), request)
            .then(() => navigate('/datasets'))
            .catch(() => alert('Error during preprocessing dataset. Please try again later.'))
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