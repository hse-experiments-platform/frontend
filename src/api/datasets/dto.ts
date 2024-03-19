import Dataset from '../../model/Dataset';

export interface GetDatasetsResponse {
    datasets: Dataset[];
}

export interface AddDatasetResponse {
    id: number;
}