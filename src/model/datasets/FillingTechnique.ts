export enum FillingTechnique {
    None = 'None',
    DeleteRow = 'DeleteRow',
    FillWithConstant = 'Constant',
    FillWithTypeDefault = 'TypeDefault',
    FillWithAggregateFunction = 'AggregateFunction'
}

export const fillingVariants = [
    FillingTechnique.None,
    FillingTechnique.DeleteRow,
    FillingTechnique.FillWithConstant,
    FillingTechnique.FillWithTypeDefault,
    FillingTechnique.FillWithAggregateFunction
];

export const fillingVariantsForEnum = [
    FillingTechnique.FillWithAggregateFunction
];

export const mapFillingTechniqueIntoString = (fillingTechnique: FillingTechnique): string => `FillingTechnique${fillingTechnique.toString()}`;