import styled from 'styled-components';
import * as yup from 'yup';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProtectedPage } from "../../components/pages";
import { ValidatedInput } from '../../components/descriptions';

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
    margin: 15px auto;
`

const ActionsContainer = styled.div`
    margin-top: 30px;
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
    margin: 30px auto;
    text-align: center;
    font-size: 20px;
`

export const GraphicUploadPage = () => {
    const [validationError, setValidationError] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const navigate = useNavigate();
    const schema = useMemo(() => yup.object().shape({
        imageUrl: yup.string().url().required()
    }), []);


    const onCancel = () => {
        navigate('/converters');
    }

    const onProceed = () => {
        schema.validate({ imageUrl })
            .then(() => {
                navigate(`/converters/graphic/define-scale`, {
                    state: {
                        imageUrl: imageUrl
                    }
                });
            })
            .catch((error) => {
                setValidationError(error.message);
            });
    }

    return (
        <ProtectedPage>
            <StyledTitle>Graphic converter</StyledTitle>
            <UploadContainer>
                <Text>
                    Paste a link to an image (.png | *.jpg) that contains a graphic. Picture must contain graphic curve and coordinate axes
                </Text>
                <InputBlock>
                    <ValidatedInput
                        placeholder='Paste URL...'
                        register={{onChange: (e: any) => setImageUrl(e.target.value)}}
                        error={validationError}
                        bigSized={true}
                    />
                </InputBlock>
                <ActionsContainer>
                    <CancelButton onClick={() => onCancel()}>Cancel</CancelButton>
                    <ConfirmButton onClick={() => onProceed()}>Proceed</ConfirmButton>
                </ActionsContainer>
            </UploadContainer>
        </ProtectedPage>
    )
}