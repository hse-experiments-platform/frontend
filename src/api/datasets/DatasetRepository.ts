import Dataset from '../../model/datasets/Dataset';
import DatasetMetadata from '../../model/datasets/DatasetMetadata';
import DatasetRow from '../../model/datasets/DatasetRow';
import { AddDatasetResponse, GetDatasetMetadataResponse, GetDatasetsResponse, GetDatasetRows, GetDatasetSchema } from './dto';
import { api } from "../utils";
import { datasetsBaseUrl as baseUrl } from '../constants';
import { GetPaginationInfo } from '../commonDto';
import DatasetColumn from '../../model/datasets/DatasetColumn';

class DatasetRepository {
    static async getPagesCount(query: string | null = null): Promise<number> {
        const response =  await api<GetPaginationInfo>('GET', `${baseUrl}/datasets?limit=10&query=${query}`, null);
        const pagesNum = Math.ceil(response.pageInfo.total / 5.0);
        return pagesNum;
    }

    static async getDatasetsList(pageIndex: number = 0, query: string | null = null, limit: number = 5): Promise<Dataset[]> {
        const offset = pageIndex * 5;
        const response =  await api<GetDatasetsResponse>('GET', `${baseUrl}/datasets?limit=${limit}&offset=${offset}&query=${query}`, null);
        return response.datasets;
    }

    static async addDataset(name: string): Promise<number> {
        const response =  await api<AddDatasetResponse>('POST', `${baseUrl}/datasets`, {
            name
        });
        return response.datasetID;
    }

    static async uploadDataset(datasetId: number, link: string): Promise<void> {
        await api<GetDatasetsResponse>('POST', `${baseUrl}/datasets/${datasetId}/upload/link`, {
            url: link
        });
    }

    static async getDatasetMetadata(datasetId: number): Promise<DatasetMetadata> {
        const response =  await api<GetDatasetMetadataResponse>('GET', `${baseUrl}/datasets/${datasetId}`, null);
        return response.dataset;
    }

    static async getDatasetRows(datasetId: number, pageIndex: number = 0): Promise<DatasetRow[]> {
        const offset = pageIndex * 7;
        const response =  await api<GetDatasetRows>('GET', `${baseUrl}/datasets/${datasetId}/rows?limit=7&offset=${offset}`, null);
        return response.rows;
    }

    static async getRowsPagesCount(datasetId: number): Promise<number> {
        const response =  await api<GetPaginationInfo>('GET', `${baseUrl}/datasets/${datasetId}/rows?limit=8`, null);
        const pagesNum = Math.ceil(response.pageInfo.total / 8.0);
        return pagesNum;
    }

    static async getDatasetSchema(datasetId: number): Promise<DatasetColumn[]> {
        const response =  await api<GetDatasetSchema>('GET', `${baseUrl}/datasets/${datasetId}`, null);
        return response.schema.columns;
    }

    static async getReadyDatasets(): Promise<Dataset[]> {
        const response =  await api<GetDatasetsResponse>('GET', `${baseUrl}/datasets?limit=10&statuses.includeReady=true`, null);
        return response.datasets;
    }

    static async changeSchema(datasetId: number, schema: any): Promise<void> {
        await api<GetDatasetsResponse>('POST', `${baseUrl}/datasets/${datasetId}/schema`, {
            columnTypes: schema
        });
    }
}

export default DatasetRepository;