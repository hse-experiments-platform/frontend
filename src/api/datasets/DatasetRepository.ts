import Dataset from '../../model/Dataset';
import { AddDatasetResponse, GetDatasetsResponse } from './dto';
import { api } from "../utils";
import { baseUrl } from '../constants';

class DatasetRepository {
    static async getDatasetsList(token: string, offset: number = 0, query: string | null = null, limit: number = 10): Promise<Dataset[]> {
        //const response =  await api<GetDatasetsResponse>('GET', `${baseUrl}/datasets?limit=${limit}&offset=${offset}`, token, null);
        //return response.datasets;
        return datasets.filter(d => d.name.includes(query ?? ""));
    }

    static async addDataset(token: string): Promise<number> {
        const id = 5;
        const response =  await api<GetDatasetsResponse>('POST', `${baseUrl}/datasets`, token, null);
        return id;
    }

    static async uploadDataset(token: string): Promise<void> {
        const id = 5;
        //const response =  await api<GetDatasetsResponse>('POST', `${baseUrl}/datasets?limit=${limit}&offset=${offset}`, token, null);
    }
}

export default DatasetRepository;

const datasets: Dataset[] = [
    {
        name: "Example 1",
        id: 1,
        version: "v0.0.1",
        status: "Loading"
    },
    {
            name: "Example 2",
            id: 2,
            version: "v1.1.1",
            status: "Ready"
    }
]

export interface ColumnMetadata {
    id: number;
    name: string;
    type: string;
}

export interface DatasetMetadata {
    id: number;
    name: string;
    version: string;
    columns: ColumnMetadata[];
}

export const datasetMetadata: DatasetMetadata = {
    id: 1,
    name: 'Example 1',
    version: 'v1.0.0',
    columns: [
        {
            id: 1,
            name: 'ID',
            type: 'integer'
        },
        {
            id: 2,
            name: 'Name',
            type: 'string'
        },
        {
            id: 3,
            name: 'Category',
            type: 'enum'
        },
        {
            id: 4,
            name: 'Price',
            type: 'decimal'
        }
    ]
}

export interface Row {
    id: number;
    columns: any[];
}

export const rows: Row[] = [
    {
        id: 1,
        columns: [1, 'Hello', 'Loading', 1000.05]
    },
    {
        id: 2,
        columns: [2, 'Fucking', 'Ready', 0.3]
    },
    {
        id: 3,
        columns: [3, 'World', 'Error', 0]
    }
]