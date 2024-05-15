interface DatasetSettings {
    datasetId: string;
}

interface ModelSettings {
    modelId: string;
}

class ExperimentParams {
    name: string;
    description: string;
    datasetSettings: DatasetSettings;
    modelSettings: ModelSettings;
    

    constructor(name: string, datasetId: string, modelId: string) {
        this.name = name;
        this.description = 'lala';
        this.datasetSettings = {
            datasetId
        }
        this.modelSettings = {
            modelId
        }
    }
}

export default ExperimentParams;