interface ModelSettings {
    modelID: string;
    hyperparameterValues: any;
}

interface DatasetSettings {
    datasetID: string;
    targetColumn: string;
    trainTestSplit: number;
}

class ModelTrainParams {
    name: string;
    description: string;
    modelSettings: ModelSettings;
    datasetSettings: DatasetSettings;

    constructor(name: string, modelSettings: ModelSettings, datasetSettings: DatasetSettings) {
        this.name = name;
        this.description = 'lalala';
        this.modelSettings = modelSettings;
        this.datasetSettings = datasetSettings;
    }
}

export default ModelTrainParams;