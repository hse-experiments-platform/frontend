import { AggregateFunction, FillingTechnique } from "..";

class EmptiesStrategy {
    technique: FillingTechnique;
    constantValue?: string;
    aggregateFunction?: AggregateFunction;

    constructor(technique: FillingTechnique, constantValue?: string, aggregateFunction?: AggregateFunction) {
        this.technique = technique;
        this.constantValue = constantValue;
        this.aggregateFunction = aggregateFunction;
    }
}

export default EmptiesStrategy;