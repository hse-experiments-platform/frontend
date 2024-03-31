import Dataset from '../../model/datasets/Dataset';
import DatasetColumn from '../../model/datasets/DatasetColumn';
import DatasetMetadata from '../../model/datasets/DatasetMetadata';
import DatasetRow from '../../model/datasets/DatasetRow';

export interface GetDatasetsResponse {
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