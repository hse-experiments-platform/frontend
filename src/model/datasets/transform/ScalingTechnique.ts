export enum ScalingTechnique {
    Normalization = 'Normalization',
    Standardization = 'Standardization'
}

export const mapScalingTechniqueIntoString = (scalingTechnique: ScalingTechnique): string => `ScalingTechnique${scalingTechnique}`;