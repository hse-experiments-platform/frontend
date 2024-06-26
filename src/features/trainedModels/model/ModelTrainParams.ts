interface LaunchInfo {
    name: string;
    description: string;
}

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
    launchInfo: LaunchInfo;
    modelSettings: ModelSettings;
    datasetSettings: DatasetSettings;

    constructor(name: string, modelSettings: ModelSettings, datasetSettings: DatasetSettings) {
        this.launchInfo = {
            name: name,
            description: ''
        }
        this.modelSettings = modelSettings;
        this.datasetSettings = datasetSettings;
    }
}

export default ModelTrainParams;