import { AggregateFunction, FillingTechnique } from "..";

class OutliersReplacementStrategy {
    mode: FillingTechnique;
    constantValue?: any;
    aggregationFunction?: AggregateFunction;

    constructor(replacementMode: FillingTechnique, constantValue?: any, aggregationFunction?: AggregateFunction) {
        this.mode = replacementMode;
        this.constantValue = constantValue;
        this.aggregationFunction = aggregationFunction;
    }
}

export default OutliersReplacementStrategy;