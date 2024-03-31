import { TrainedModel } from "../../model/trainedModels";

export interface GetTrainedModelsResponse {
    models: TrainedModel[];
}

export interface GetTrainedModelResponse {
    model: TrainedModel;
}