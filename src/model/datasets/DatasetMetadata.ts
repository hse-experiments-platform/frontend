export class DatasetMetadata {
    id: number;
    name: string;
    version: string;
    status: string;
    rowsCount: number;
    uploadError: string;

    constructor(id: number, name: string, version: string, status: string, rowsCount: number, uploadError: string) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.status = status;
        this.rowsCount = rowsCount;
        this.uploadError = uploadError;
    }

    couldBePreprocessed(): boolean {
        return ['ConvertationError', 'WaitsConvertation'].includes(this.status);
    }
}

export const isDatasetLoaded = (datasetStatus: string): boolean => {
    return !['LoadingError', 'Initializing', 'Loading'].includes(datasetStatus);
}

export const isLoadError = (datasetStatus: string): boolean => {
    return ['LoadingError', 'Initializing'].includes(datasetStatus);
}

export const canBeTransformed = (datasetStatus: string): boolean => {
    return datasetStatus === 'Ready';
}