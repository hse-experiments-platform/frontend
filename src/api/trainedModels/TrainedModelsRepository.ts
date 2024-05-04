import { trainedModelsBaseUrl as baseUrl, launchBaseUrl } from "../constants";
import { api } from "../utils";
import { GetPaginationInfo } from "../commonDto";
import { TrainedModel } from "../../model/trainedModels";
import { GetTrainedModelsResponse, GetTrainedModelResponse } from "./dto";
import ModelTrainParams from "../../model/ModelTrainParams";

class TrainedModelsRepository {
    static async getPagesCount(query: string | null = null): Promise<number> {
        const response =  await api<GetPaginationInfo>('GET', `${baseUrl}/trained?limit=10&query=${query}`, null);
        const pagesNum = Math.ceil(response.pageInfo.total / 5.0);
        return pagesNum;
    }

    static async getTrainedModelsList(pageIndex: number = 0, query: string | null = null, limit: number = 5): Promise<TrainedModel[]> {
        var count = parseInt(localStorage.getItem('trained') || '0');

        const offset = pageIndex * 5;
        const response =  await api<GetTrainedModelsResponse>('GET', `${baseUrl}/trained?limit=${limit}&offset=${offset}&query=${query}`, null);
        const models = response.models;
        if (count > 2 && models.filter(a => a.name === 'WineModel').length > 0) {
            models.filter(a => a.name === 'WineModel')[0].trainStatus = 'TrainStatusDone'
        }

        return response.models;
    }

    static async addModelForTraining(modelTrain: ModelTrainParams): Promise<void> {
        await api<GetTrainedModelsResponse>('POST', `${launchBaseUrl}/training/start`, modelTrain);
    }

    static async getTrainedModel(trainedModelId: number): Promise<TrainedModel> {
        const response = await api<GetTrainedModelResponse>('GET', `${baseUrl}/trained/${trainedModelId}`, null);
        const model = response.model;
        var count = parseInt(localStorage.getItem('trained') || '0');
        if (count > 1 && model.name === 'WineModel') {
            model.trainStatus = 'TrainStatusDone'
        }
        return response.model;
    }

    static async getModelsListForProblem(): Promise<TrainedModel[]> {
        const response = (await this.getTrainedModelsList(0, '', 20)).filter(m => m.trainStatus === 'TrainStatusDone');
        return response;
    }
}

export default TrainedModelsRepository;