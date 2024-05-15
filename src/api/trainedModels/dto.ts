import { TrainedModel } from "../../features/trainedModels/model";
import PaginatedResponse from "../PaginatedResponse";

export interface GetTrainedModelsResponse extends PaginatedResponse {
    models: TrainedModel[];
}

export interface GetTrainedModelResponse {
    model: TrainedModel;
}