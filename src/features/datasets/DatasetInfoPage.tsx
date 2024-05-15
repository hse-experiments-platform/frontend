import { useState, useCallback, useMemo } from 'react';
import { useParams } from "react-router-dom";
import { DatasetRepository } from "../../api";
import { DatasetMetadata } from "../../model/datasets";
import useRequest from "../../hooks/useRequest";
import ProcessDatasetPage from './ProcessDatasetPage';
import ViewDatasetPage from './ViewDatasetPage';

export const DatasetInfoPage = () => {
    const { id } = useParams();
    const datasetId = useMemo(() => parseInt(id ?? ''), [id]);
    const [metadata, setMetadata] = useState<DatasetMetadata | null>(null);
    
    const fetchMetadata = useCallback(async () => {
        const response = await DatasetRepository.getDatasetMetadata(datasetId);
        setMetadata(response);
    }, [datasetId, setMetadata]);
    useRequest(fetchMetadata);

    if (metadata === null) {
        return (<div>Loading...</div>)
    } else if (metadata.couldBePreprocessed()) {
        return (<ProcessDatasetPage metadata={metadata}/>)
    } else {
        return (<ViewDatasetPage metadata={metadata}/>)
    }
}