interface LaunchInfo {
    name: string;
    description: string;
}

class ExperimentParams {
    launchInfo: LaunchInfo;
    trainedModelID: string;
    datasetID: string;
    

    constructor(name: string, datasetId: string, modelId: string) {
        this.launchInfo = {
            name: name,
            description: ''
        };
        this.trainedModelID = modelId;
        this.datasetID = datasetId;
    }
}

export default ExperimentParams;