import { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProtectedPage from "../../components/pages/ProtectedPage";
import { RequestContext, RequestContextType } from "../../contexts";
import DatasetRepository from "../../api/datasets/DatasetRepository";

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

const TextSeparator = styled.p`
    font-size: 20px;
    margin-bottom: 10px;
    color: #03256C;
`

const StyledTextInput = styled.input`
    display: block;
    border: 1px solid black;
    border-radius: 10px;
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

export const AddDatasetPage = () => {
    const [name, setName] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const { setError, setIsLoading } = useContext(RequestContext) as RequestContextType;
    const navigate = useNavigate();
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const onNameChange = (e: any) => {
        setHasChanges(true);
        setName(e.target.value)
    }

    const onLinkChange = (e: any) => {
        setHasChanges(true);
        setLink(e.target.value)
    }

    const onCancel = () => {
        if (hasChanges) {
            alert('Are you sure?')
            navigate('/datasets')
        } else {
            navigate('/datasets')
        }
    };

    const onConfirm = () => {
        const addDataset = async () => {
            setIsLoading(true);
            const datasetId = await DatasetRepository.addDataset(name);
            await DatasetRepository.uploadDataset(datasetId, link);
            navigate('/datasets');
        }

        addDataset()
            .catch(_ => setError("Request error"))
            .then(_ => setIsLoading(false));
    }

    return (
        <ProtectedPage>
            <StyledTitle>Upload dataset</StyledTitle>
            <UploadContainer>
                <InputBlock>
                    <TextSeparator>Dataset name</TextSeparator>
                    <StyledTextInput placeholder="Enter name..." onChange={e => onNameChange(e)}/>
                </InputBlock>
                <InputBlock>
                    <TextSeparator>CSV link</TextSeparator>
                    <StyledTextInput placeholder="Paste URL..." onChange={e => onLinkChange(e)}/>
                </InputBlock>
                <ActionsContainer>
                    <CancelButton onClick={() => onCancel()}>Cancel</CancelButton>
                    <ConfirmButton onClick={() => onConfirm()}>Confirm</ConfirmButton>
                </ActionsContainer>
            </UploadContainer>
        </ProtectedPage>
    )
}