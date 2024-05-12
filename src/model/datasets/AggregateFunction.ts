export enum AggregateFunction {
    Max = 'Max',
    Min = 'Min',
    Average = 'Average',
    MostFrequent = 'MostFrequent',
    Median = 'Median'
}

export const aggregateVariants = [
    AggregateFunction.Min,
    AggregateFunction.Average,
    AggregateFunction.Median,
    AggregateFunction.Max,
    AggregateFunction.MostFrequent
]

export const aggregateVariantsForEnum = [
    AggregateFunction.MostFrequent
]