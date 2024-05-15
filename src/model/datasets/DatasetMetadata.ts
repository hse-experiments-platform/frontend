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