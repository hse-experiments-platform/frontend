export interface MainInfo {
    name: string;
    problemId: string;
    modelId: string;
    datasetId: string;
}

export interface ParameterValue {
    id: string;
    value: string;
}

export interface DatasetParameters {
    targetColumn: string;
    trainTestSplit: number;
}