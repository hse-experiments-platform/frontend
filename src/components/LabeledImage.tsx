import styled from 'styled-components';

interface LabeledImageProps {
    url: string;
    caption: string;
}

const Image = styled.img`
    display: block;
    width: 300px;
    height: 250px;
    margin: auto;
`

const Caption = styled.p`
    text-align: center;
    font-size: 17px;
    font-weight: 700;
    margin-top: 7px;
`

export const LabeledImage = ({url, caption}: LabeledImageProps) => {
    return (
        <div>
            <Image src={url}/>
            <Caption>{caption}</Caption>
        </div>
    )
}