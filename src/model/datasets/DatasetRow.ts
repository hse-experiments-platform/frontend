export class DatasetRow {
    rowNumber: number;
    columns: string[];

    constructor(rowNumber: number, columns: string[]) {
        this.rowNumber = rowNumber;
        this.columns = columns;
    }
}