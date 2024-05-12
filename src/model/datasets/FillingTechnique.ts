export enum FillingTechnique {
    None = 'None',
    DeleteRow = 'DeleteRow',
    FillWithConstant = 'FillWithConstant',
    FillWithTypeDefault = 'FillWithTypeDefault',
    FillWithAggregateFunction = 'FillWithAggregateFunction'
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