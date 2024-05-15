class ExperimentInfo {
    id: string;
    name: string;
    status: string;
    datasetName: string;
    target: string;
    startDateTime: Date;

    constructor(id: string, name: string, status: string, datasetName: string, target: string, startDateTime: Date) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.datasetName = datasetName;
        this.target = target;
        this.startDateTime = startDateTime;
    }
}

export default ExperimentInfo;