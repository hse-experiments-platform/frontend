import { trainedModelsBaseUrl as baseUrl, launchBaseUrl } from "../constants";
import { api } from "../utils";
import { TrainedModel } from "../../features/trainedModels/model";
import TrainedModelMetrics from "../../features/trainedModels/metrics/TrainedModelMetrics";
import { GetTrainedModelsResponse, GetTrainedModelResponse, GetMetricsResponse } from "./dto";
import ModelTrainParams from "../../features/trainedModels/model/ModelTrainParams";
import Paginated from "../../model/PaginatedModel";

class TrainedModelsRepository {

    static async getPaginatedTrainedModelsList(pageIndex: number = 0, query: string | null = null, limit: number): Promise<Paginated<TrainedModel>> {
        const offset = pageIndex * limit;
        const response =  await api<GetTrainedModelsResponse>('GET', `${baseUrl}/trained?limit=${limit}&offset=${offset}&query=${query}`, null);
        return new Paginated(response.pageInfo.total, response.models);
    }

    static async addModelForTraining(modelTrain: ModelTrainParams): Promise<void> {
        await api<GetTrainedModelsResponse>('POST', `${launchBaseUrl}/train`, modelTrain);
    }

    static async getTrainedModel(trainedModelId: number): Promise<TrainedModel> {
        const response = await api<GetTrainedModelResponse>('GET', `${baseUrl}/trained/${trainedModelId}`);
        return response.model;
    }

    static async getMetricsForTrainedModel(trainedModelId: number): Promise<TrainedModelMetrics> {
        const response = await api<GetMetricsResponse>('GET', `${baseUrl}/trained/${trainedModelId}/metrics`);
        return response.metrics;
    }

    static async getModelsListForProblem(): Promise<TrainedModel[]> {
        const response = (await this.getPaginatedTrainedModelsList(0, '', 100)).list.filter(m => m.trainStatus === 'LaunchStatusSuccess');
        return response;
    }
}

export default TrainedModelsRepository;