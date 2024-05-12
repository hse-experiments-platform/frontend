import EmptiesStrategy from "./EmptiesStrategy";
import { ColumnDataType } from "./ColumnDataType";
import { DatasetColumn, FillingTechnique } from "..";


interface ColumnPreprocessingSettings {
    columnType: ColumnDataType;
    emptiesStrategy: EmptiesStrategy;
}

type ColumnsSettingsMap = { [columnName: string]: ColumnPreprocessingSettings; };

class DatasetPreprocessingSettings {
    columnsSettings: ColumnsSettingsMap;

    constructor(columnsSettings: ColumnsSettingsMap) {
        this.columnsSettings = columnsSettings;
    }

    public static createDefaultSettings(columns: DatasetColumn[]) {
        let columnsSettingsMap: ColumnsSettingsMap = {};

        for (const column of columns) {
            columnsSettingsMap[column.name] = {
                columnType: ColumnDataType.Undefined,
                emptiesStrategy: {
                    technique: FillingTechnique.FillWithTypeDefault
                }
            }
        }

        return new DatasetPreprocessingSettings(columnsSettingsMap);
    }
}

export default DatasetPreprocessingSettings;