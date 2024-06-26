import styled from 'styled-components';
import ImageMetric from "../metrics/ImageMetric";
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
                    url={metric.graphicUrl}
                    caption={metric.name}
                />
            ))}
        </Container>
    )
}

export default ImagesBlock;