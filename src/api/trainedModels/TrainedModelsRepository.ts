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
        const offset = pageIndex * 5;
        const response =  await api<GetTrainedModelsResponse>('GET', `${baseUrl}/trained?limit=${limit}&offset=${offset}&query=${query}`, null);
        return response.models;
    }

    static async addModelForTraining(modelTrain: ModelTrainParams): Promise<void> {
        await api<GetTrainedModelsResponse>('POST', `${launchBaseUrl}/training/start`, modelTrain);
    }

    static async getTrainedModel(trainedModelId: number): Promise<TrainedModel> {
        const response = await api<GetTrainedModelResponse>('GET', `${baseUrl}/trained/${trainedModelId}`, null);
        return response.model;
    }
}

export default TrainedModelsRepository;