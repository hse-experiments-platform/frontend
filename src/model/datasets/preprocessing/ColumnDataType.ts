export enum ColumnDataType {
    Undefined = 'Undefined',
    Delete = 'Dropped',
    Categorical = 'Categorical',
    Int = 'Integer',
    Float = 'Float',
}

export const mapColumnTypeIntoString = (columnType: ColumnDataType): string => `ColumnType${columnType.toString()}`;

export const dataTypeVariants = [
    ColumnDataType.Categorical,
    ColumnDataType.Int,
    ColumnDataType.Float,
];