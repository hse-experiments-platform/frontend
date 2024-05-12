import { DatasetColumn } from "../../../model/datasets";

interface DatasetColumnTracker {
    datasetColumn: DatasetColumn;
    active: boolean;
}

export default DatasetColumnTracker;