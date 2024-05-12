export enum ColumnDataType {
    Undefined = 'Undefined',
    Delete = 'Delete',
    Categorical = 'Categorical',
    Int = 'Integer',
    Float = 'Float',
}

export const dataTypeVariants = [
    ColumnDataType.Categorical,
    ColumnDataType.Int,
    ColumnDataType.Float,
];