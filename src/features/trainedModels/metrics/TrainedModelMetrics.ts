import ImageMetric from "./ImageMetric";
import NumberMetric from "./NumberMetric";

class TrainedModelMetrics {
    id: number;
    test: NumberMetric[];
    cv: ImageMetric[] | null;
    imageImportanceVisualization: ImageMetric[];

    constructor(id: number, test: NumberMetric[], cv: ImageMetric[] | null, featureImportance: ImageMetric[]) {
        this.id = id;
        this.test = test;
        this.cv = cv;
        this.imageImportanceVisualization = featureImportance;
    }
}

export default TrainedModelMetrics;