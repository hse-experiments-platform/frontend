import { datasetMetadata, rows } from "../../../api/datasets/DatasetRepository";
import { ShallowTable } from "../../../components";


export interface Rows2 {
    id: number;
    columns: any[]
}

export const DatasetRowsTab = () => {
    const columnNames = datasetMetadata.columns.map(c => c.name);
    const data = rows.map(r => r.columns)
    
    return (
        <ShallowTable columnNames={columnNames} data={data} needsStringify={true}/>
    )
}