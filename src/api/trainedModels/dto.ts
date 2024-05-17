import { TrainedModel } from "../../features/trainedModels/model";
import TrainedModelMetrics from "../../features/trainedModels/metrics/TrainedModelMetrics";
import PaginatedResponse from "../PaginatedResponse";

export interface GetTrainedModelsResponse extends PaginatedResponse {
    models: TrainedModel[];
}

export interface GetTrainedModelResponse {
    model: TrainedModel;
}

export interface GetMetricsResponse {
    metrics: TrainedModelMetrics;
}