import styled from 'styled-components';
import ImageMetric from "../../../model/metrics/ImageMetric";
import { PropertyContainer } from '../../../components/descriptions';
import { LabeledImage } from '../../../components';

interface ImagesBlockProps {
    metrics: ImageMetric[];
}

const Container = styled(PropertyContainer)`
    justify-content: center;
    width: 100%;
`

const ImagesBlock = ({metrics}: ImagesBlockProps) => {
    return (
        <Container>
            {metrics.map(metric => (
                <LabeledImage
                    url={metric.url}
                    caption={metric.name}
                />
            ))}
        </Container>
    )
}

export default ImagesBlock;