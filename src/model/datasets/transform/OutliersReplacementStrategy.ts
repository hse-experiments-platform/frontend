import AggregateFunction from "./AggregateFunction";
import FillingTechnique from "./FillingTechnique";

class OutliersReplacementStrategy {
    mode: FillingTechnique;
    constantValue?: any;
    aggregateValue?: AggregateFunction;

    constructor(replacementMode: FillingTechnique, constantValue?: any, aggregateValue?: AggregateFunction) {
        this.mode = replacementMode;
        this.constantValue = constantValue;
        this.aggregateValue = aggregateValue;
    }
}

export default OutliersReplacementStrategy;