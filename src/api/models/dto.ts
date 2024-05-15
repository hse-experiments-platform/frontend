import Model from "../../features/trainedModels/model/Model";
import ModelHyperparameter from "../../features/trainedModels/model/ModelHyperparameter";

export interface GetModelssResponse {
    models: Model[];
}

interface Hyperparametrs {
    hyperparameters: ModelHyperparameter[];
}

export interface GetModelHyperparameters {
    model: Hyperparametrs;
}