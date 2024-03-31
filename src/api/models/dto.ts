import Model from "../../model/Model";
import ModelHyperparameter from "../../model/ModelHyperparameter";

export interface GetModelssResponse {
    models: Model[];
}

interface Hyperparametrs {
    hyperparameters: ModelHyperparameter[];
}

export interface GetModelHyperparameters {
    model: Hyperparametrs;
}