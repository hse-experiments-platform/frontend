export enum OutliersDetectingMode {
    None = 'None',
    MinMaxThreshold = 'MinMaxThresholds',
    IQRMethod = 'IQRMethod'
}

export const mapOutliersDetectingModeIntoString = (outliersDetectingMode: OutliersDetectingMode): string => `OutliersDetectingMode${outliersDetectingMode}`;