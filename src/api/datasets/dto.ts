import PaginatedResponse from '../PaginatedResponse';
import { Dataset, DatasetMetadata, DatasetRow, DatasetColumn } from '../../model/datasets';

export interface GetDatasetsResponse extends PaginatedResponse {
    datasets: Dataset[];
}

export interface AddDatasetResponse {
    datasetID: number;
}

export interface GetDatasetMetadataResponse {
    dataset: DatasetMetadata;
}

export interface GetDatasetRows {
    rows: DatasetRow[];
}

interface DatasetSchema {
    columns: DatasetColumn[];
}

export interface GetDatasetSchema {
    schema: DatasetSchema;
}