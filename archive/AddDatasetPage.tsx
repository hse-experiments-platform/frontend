import { useState } from "react";
import styled from "styled-components";
import { Separator } from "@radix-ui/react-separator";
import { useNavigate } from "react-router-dom";

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
    margin: 30px auto;
    min-width: 110px;
`

const ChooseFileButton = styled.button`
    display: block;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #EBEBEB;
    width: 100px;
    height: 30px;
    margin: 40px auto 30px auto;
    cursor: pointer;
`

const SeparationContainer = styled.div`
    display: flex;
    width: 300px;
    justify-content: center;
    gap: 15px;
    margin: 0 auto;
`

const StyledSeparator = styled(Separator)`
    margin-top: 10.5px;
    display: block-inline;
    background-color: #676767;
    width: 150px;
    height: 1px;
`

const TextSeparator = styled.p`
    display: inline;
    color: #03256C;
`

const LinkInput = styled.input`
    display: block;
    border: 1px solid black;
    border-radius: 10px;
    margin: 30px auto;
    width: 280px;
    height: 30px;
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
    width: 80px;
    height: 27px;
`

const CancelButton = styled(OvalButton)`
    background-color: white;
`

const ConfirmButton = styled(OvalButton)`
    background-color: #0245D1;
    color: white;
`

const AddDatasetPage = () => {
    const navigate = useNavigate();
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const onBackOperation = () => {
        console.log(hasChanges)
        if (hasChanges) {
            alert('Are you sure?')
            navigate('/datasets')
        } else {
            navigate('/datasets')
        }
    };

    const onProceed = () => {
        navigate('/datasets/1')
    }

    useBackListener(() => onBackOperation());

    return (
        <ProtectedPage>
            <StyledTitle>Upload dataset</StyledTitle>
            <UploadContainer>
                <ChooseFileButton>Choose file</ChooseFileButton>
                <SeparationContainer>
                    <StyledSeparator/>
                    <TextSeparator>or</TextSeparator>
                    <StyledSeparator/>
                </SeparationContainer>
                <LinkInput placeholder="Paste URL" onChange={() => setHasChanges(true)}/>
                <ActionsContainer>
                    <CancelButton onClick={() => onBackOperation()}>Cancel</CancelButton>
                    <ConfirmButton onClick={() => onProceed()}>Confirm</ConfirmButton>
                </ActionsContainer>
            </UploadContainer>
        </ProtectedPage>
    )
}