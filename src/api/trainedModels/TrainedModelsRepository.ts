import { trainedModelsBaseUrl as baseUrl, launchBaseUrl } from "../constants";
import { api } from "../utils";
import { TrainedModel } from "../../features/trainedModels/model";
import { GetTrainedModelsResponse, GetTrainedModelResponse } from "./dto";
import ModelTrainParams from "../../features/trainedModels/model/ModelTrainParams";
import Paginated from "../../model/PaginatedModel";

class TrainedModelsRepository {

    static async getPaginatedTrainedModelsList(pageIndex: number = 0, query: string | null = null, limit: number): Promise<Paginated<TrainedModel>> {
        var count = parseInt(localStorage.getItem('trained') || '0');

        const offset = pageIndex * limit;
        const response =  await api<GetTrainedModelsResponse>('GET', `${baseUrl}/trained?limit=${limit}&offset=${offset}&query=${query}`, null);
        const models = response.models;
        if (count > 2 && models.filter(a => a.name === 'WineModel').length > 0) {
            models.filter(a => a.name === 'WineModel')[0].trainStatus = 'TrainStatusDone'
        }

        return new Paginated(response.pageInfo.total, response.models);
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
        const response = (await this.getPaginatedTrainedModelsList(0, '', 20)).list.filter(m => m.trainStatus === 'TrainStatusDone');
        return response;
    }
}

export default TrainedModelsRepository;