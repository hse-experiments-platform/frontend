import Paginated from '../../model/PaginatedModel';
import { Dataset, DatasetMetadata, DatasetRow, DatasetColumn } from '../../model/datasets';
import { AddDatasetResponse, GetDatasetMetadataResponse, GetDatasetsResponse, GetDatasetRows, GetDatasetSchema } from './dto';
import { api } from "../utils";
import { datasetsBaseUrl as baseUrl } from '../constants';
import PaginatedResponse from '../PaginatedResponse';


export class DatasetRepository {
    static async getPaginatedDatasetsList(pageIndex: number = 0, query: string | null = null, limit: number): Promise<Paginated<Dataset>> {
        const offset = pageIndex * limit;
        const response =  await api<GetDatasetsResponse>('GET', `${baseUrl}/datasets?limit=${limit}&offset=${offset}&query=${query}`, null);
        return new Paginated(response.pageInfo.total, response.datasets)
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
        const data = response.dataset;
        return new DatasetMetadata(data.id, data.name, data.version, data.status, data.rowsCount, data.uploadError);
    }

    static async getDatasetRows(datasetId: number, pageIndex: number = 0): Promise<DatasetRow[]> {
        const offset = pageIndex * 7;
        const response =  await api<GetDatasetRows>('GET', `${baseUrl}/datasets/${datasetId}/rows?limit=7&offset=${offset}`, null);
        return response.rows;
    }

    static async getRowsPagesCount(datasetId: number): Promise<number> {
        const response =  await api<PaginatedResponse>('GET', `${baseUrl}/datasets/${datasetId}/rows?limit=8`, null);
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

    static async getDatasetForModel(): Promise<Dataset[]> {
        const datasets = await this.getReadyDatasets();
        return datasets;//.filter(d => d.name.includes('Wine'));
    }
}