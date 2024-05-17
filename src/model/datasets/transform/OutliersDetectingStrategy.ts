import { OutliersDetectingMode } from "./OutliersDetectingMode";

class OutliersDetectingStrategy {
    mode: OutliersDetectingMode;
    min?: number;
    max?: number;

    constructor(mode: OutliersDetectingMode, min?: number, max?: number) {
        this.mode = mode;
        this.min = min;
        this.max = max;
    }
}

export default OutliersDetectingStrategy;