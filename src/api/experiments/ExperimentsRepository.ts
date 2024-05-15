import { GetExperimentsResponse } from "./dto";
import { launchBaseUrl as baseUrl } from "../constants";
import { api } from "../utils";
import ExperimentInfo from "../../features/experiments/model/ExperimentInfo";
import PaginatedResponse from '../PaginatedResponse';
import ExperimentParams from "../../features/experiments/model/ExperimentParams";
import { launchBaseUrl } from "../constants";
import Paginated from "../../model/PaginatedModel";

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

    static async getPaginatedList(pageIndex: number = 0, query: string | null = null, limit: number): Promise<Paginated<ExperimentInfo>> {
        const offset = pageIndex * 5;
        /*const response = await api<GetExperimentsResponse>(
            'GET',
            `${baseUrl}/launches??limit=${limit}&offset=${offset}&query=${query}&launchTypes.IncludePredict=true`,
            null
        );
        return response.experiments;*/
        var count = parseInt(localStorage.getItem('counter') || '0');
        const arr = count <= 3 ? experiments1 : experiments2;
        return new Paginated(1, arr);
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