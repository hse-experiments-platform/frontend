import EmptiesStrategy from "../preprocessing/EmptiesStrategy";
import ScalingTechnique from "./ScalingTechnique";
import OutliersDetectingStrategy from "./OutliersDetectingStrategy";
import OutliersReplacementStrategy from "./OutliersReplacementStrategy";
import EncodingTechnique from "./EncodingTechnique";
import { DatasetColumn } from "..";
import { FillingTechnique } from "..";
import OutliersDetectingMode from "./OutliersDetectingMode";

interface ColumnTransformSettings {
    scalingTechnique?: ScalingTechnique;
    encodingTechnique?: EncodingTechnique;
    emptiesStrategy: EmptiesStrategy;
    outliersDetectingStrategy: OutliersDetectingStrategy;
    outliersReplacementStrategy?: OutliersReplacementStrategy;
}

type ColumnsSettingsMap = { [columnName: string]: ColumnTransformSettings; };

class DatasetTransformSettings {
    columnsSettings: ColumnsSettingsMap;

    constructor(columnsSettings: ColumnsSettingsMap) {
        this.columnsSettings = columnsSettings;
    }

    public static createDefaultSettings(columns: DatasetColumn[]) {
        let columnsSettingsMap: ColumnsSettingsMap = {};

        for (const column of columns) {
            columnsSettingsMap[column.name] = {
                scalingTechnique: column.type !== 'enum' ? ScalingTechnique.Standardization : undefined,
                encodingTechnique: column.type === 'enum' ? EncodingTechnique.LabelEncoding : undefined,
                emptiesStrategy: {
                    technique: FillingTechnique.FillWithTypeDefault
                },
                outliersDetectingStrategy: {
                    mode: OutliersDetectingMode.None,                   
                }
            }
        }

        return new DatasetTransformSettings(columnsSettingsMap);
    }
}

export default DatasetTransformSettings;