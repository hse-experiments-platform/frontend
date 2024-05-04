import { GetExperimentsResponse } from "./dto";
import { launchBaseUrl as baseUrl } from "../constants";
import { api } from "../utils";
import ExperimentInfo from "../../model/experiments/ExperimentInfo";
import { GetPaginationInfo } from "../commonDto";
import ExperimentParams from "../../model/experiments/ExperimentParams";
import { launchBaseUrl } from "../constants";

let experiments1: ExperimentInfo[] = [
    {
        id: '1',
        name: 'Example',
        status: 'Ready',
        datasetName: 'food',
        target: 'Gender',
        startDateTime: new Date('2024-04-23T16:24:00')
    },
    {
        id: '2',
        name: 'test',
        status: 'Ready',
        datasetName: 'test ds',
        target: 'Family size',
        startDateTime: new Date('2024-04-22T12:51:37')
    }
]

const experiments2: ExperimentInfo[] = [
    {
        id: '4',
        name: 'WinePrediction',
        status: 'Ready',
        datasetName: 'WinePredict',
        target: 'quality',
        startDateTime: new Date()
    },
    {
        id: '1',
        name: 'Example',
        status: 'Ready',
        datasetName: 'food',
        target: 'Gender',
        startDateTime: new Date('2024-04-23T16:24:00')
    },
    {
        id: '2',
        name: 'test',
        status: 'Ready',
        datasetName: 'test ds',
        target: 'Family size',
        startDateTime: new Date('2024-04-22T12:51:37')
    }
]

class ExperimentsRepository {
    static async getPagesCount(query: string | null = null): Promise<number> {
       /* const response =  await api<GetPaginationInfo>('GET',
            `${baseUrl}/launches?limit=${10}&query=${query}&launchTypes.IncludePredict=true`,
            null
        );
        const pagesNum = Math.ceil(response.pageInfo.total / 5.0);
        return pagesNum;*/
        return 1;
    }

    static async getList(pageIndex: number = 0, query: string | null = null, limit: number = 5): Promise<ExperimentInfo[]> {
        const offset = pageIndex * 5;
        /*const response = await api<GetExperimentsResponse>(
            'GET',
            `${baseUrl}/launches??limit=${limit}&offset=${offset}&query=${query}&launchTypes.IncludePredict=true`,
            null
        );
        return response.experiments;*/
        var count = parseInt(localStorage.getItem('counter') || '0');
        console.log(count)
        return count <= 3 ? experiments1 : experiments2;
    }

    static async launchExperiment(params: ExperimentParams): Promise<void> {
        experiments1 = [{
            id: '3',
            name: params.name,
            status: 'InProgress',
            datasetName: 'wine',
            target: 'quality',
            startDateTime: new Date()
        }].concat(experiments1);
        await new Promise(f => setTimeout(f, 800));
        //await api<void>('POST', `${launchBaseUrl}/prediction/start`, params);
    }
    
    static async getExperimentInfo(): Promise<ExperimentInfo> {
        await new Promise(f => setTimeout(f, 300));
        return experiments2[0];
    }

    static async getExperimentResultUrl(): Promise<string> {
        return 'https://drive.usercontent.google.com/u/0/uc?id=1aQ_Y8ZZ_0EAJQpbkqGbxCqSzabtAnf-o&export=download';
    }
}

export default ExperimentsRepository;