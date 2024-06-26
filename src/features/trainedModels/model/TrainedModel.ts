export class TrainedModel {
    trainedModelID: string;
    name: string;
    trainStatus: string;
    baseModelName: string;
    trainDatasetID: string;
    trainDatasetName: string;
    problemName: string;
    launchID: number;
    targetColumn: string;

    constructor(trainedModelID: string, name: string, trainStatus: string, baseModelName: string,
        trainDatasetID: string, trainDatasetName: string, problemName: string, launchID: number, targetColumn: string) {
        this.trainedModelID = trainedModelID;
        this.name = name;
        this.trainStatus = trainStatus;
        this.baseModelName = baseModelName;
        this.trainDatasetID = trainDatasetID;
        this.trainDatasetName = trainDatasetName;
        this.problemName = problemName;
        this.launchID = launchID;
        this.targetColumn = targetColumn;
    }
}