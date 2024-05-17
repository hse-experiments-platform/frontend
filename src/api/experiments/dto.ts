import ExperimentInfo from "../../features/experiments/model/ExperimentInfo";
import PaginatedResponse from "../PaginatedResponse";

interface Prediction {
    launchID: string;
    name: string;
    status: string;
    datasetName: string;
    target: string;
    startDateTime: string;
}

export interface GetExperimentsResponse extends PaginatedResponse {
    predictions: Prediction[];
}

export interface GetExperimentInfo {
    launchInfo: ExperimentInfo;
    datasetID: string;
    trainedModelID: string;
}

export interface GetPredictionLink {
    downloadLink: string;
}