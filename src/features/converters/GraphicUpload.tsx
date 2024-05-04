import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ProtectedPage from "../../components/pages/ProtectedPage"

const StyledTitle = styled.h2`
    width: 100%;
    text-align: center;
    font-weigth: 700;
    font-size: 30px;
    margin-top: 30px;
`

const UploadContainer = styled.div`
    background: white;
    border: 1px solid black;
    border-radius: 10px;
    height: 60%;
    width: 50%;
    min-width: 300px;
    margin: 30px auto;
`

const InputBlock = styled.div`
    width: 280px;
    margin: 20px auto;
`

const StyledTextInput = styled.input`
    display: block;
    border: 1px solid black;
    border-radius: 10px;
    width: 280px;
    height: 35px;
    background-color: #EBEBEB;
    padding-left: 15px;
`

const ActionsContainer = styled.div`
    margin-top: 40px;
    margin-right: 20px;
    display: flex;
    justify-content: right;
    gap: 10px;
`

const OvalButton = styled.button`
    border: 1px solid black;
    border-radius: 25px;
    width: 85px;
    height: 33px;
`

const CancelButton = styled(OvalButton)`
    background-color: white;
`

const ConfirmButton = styled(OvalButton)`
    background-color: #0245D1;
    color: white;
`

const Text = styled.p`
    display: block;
    width: 70%;
    margin: 40px auto;
    text-align: center;
    font-size: 20px;
`

export const GraphicUploadPage = () => {
    const navigate = useNavigate();


    const onCancel = () => {
        navigate('/converters');
    }

    const onProceed = () => {
        navigate(`/converters/graphic/define-scale`, {
            state: {
                imageUrl: 'http://tcarzverey.ru:9901/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL2ltYWdlcy1ob3N0aW5nL1NWLmJtcD9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUVUUjhORjJZTjNISTZBN09VNk1IJTJGMjAyNDA0MjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDI4VDIzMjYwMVomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSkZWRkk0VGtZeVdVNHpTRWsyUVRkUFZUWk5TQ0lzSW1WNGNDSTZNVGN4TkRNMk5UVTJPU3dpY0dGeVpXNTBJam9pYldsdWFXOWZkWE5sY2lKOS44MDBvd21hdmd4NVdhZXFnRnY4UHdIV2c4UzYxaW1Vem56RHIwWUdPeEZZQnV0N1h4Z05DaXBmQnpWUTh2ZEhLb3p5SGZ5Ui0yczJ5SkNtZlBKRUZaUSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTVhOGZjNDg5ZGUzMzc1YzI4MDY2YmI2ZjgyY2VhMTg5MGNkM2FlYmExM2FjZmQ2YjFkZGUyN2I5YmUzNGVhMDQ=',
            }
        })
    }

    return (
        <ProtectedPage>
            <StyledTitle>Graphic converter</StyledTitle>
            <UploadContainer>
                <Text>
                    Paste a link to an image (.png | *.jpg) that contains a graphic. Picture must contain graphic curve and coordinate axes
                </Text>
                <InputBlock>
                    <StyledTextInput placeholder="Paste URL..." onChange={e => {}}/>
                </InputBlock>
                <ActionsContainer>
                    <CancelButton onClick={() => onCancel()}>Cancel</CancelButton>
                    <ConfirmButton onClick={() => onProceed()}>Proceed</ConfirmButton>
                </ActionsContainer>
            </UploadContainer>
        </ProtectedPage>
    )
}