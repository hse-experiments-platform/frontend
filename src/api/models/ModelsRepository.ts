import { trainedModelsBaseUrl as baseUrl } from "../constants";
import { api } from "../utils";
import Model from "../../features/trainedModels/model/Model";
import { GetModelHyperparameters, GetModelssResponse } from "./dto";
import ModelHyperparameter from "../../features/trainedModels/model/ModelHyperparameter";

class ModelsRepository {
    static async getModelsList(problemId?: string): Promise<Model[]> {
        const response =  await api<GetModelssResponse>('GET', `${baseUrl}/models?limit=10&problemID=${problemId}`, null);
        return response.models;
    }

    static async getHyperparameters(modelId: string): Promise<ModelHyperparameter[]> {
        const response =  await api<GetModelHyperparameters>('GET', `${baseUrl}/models/${modelId}`, null);
        return response.model.hyperparameters;
    }
}

export default ModelsRepository;