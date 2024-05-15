import { PropertyContainer, PropertyInput, PropertyName } from "../../../components/descriptions";
import NumberMetric from "../metrics/NumberMetric";

interface NumberMetricsBlockProps {
    metrics: NumberMetric[];
}

const NumberMetricsBlock = ({metrics}: NumberMetricsBlockProps) => {
    return (
        <PropertyContainer>
            {metrics.map(metric => (
                <>
                    <PropertyName text={metric.name}/>
                    <PropertyInput disabled={true} value={metric.value.toString()}/>
                </>
            ))}
        </PropertyContainer>
    )
}

export default NumberMetricsBlock;