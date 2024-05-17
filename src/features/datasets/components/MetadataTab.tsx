import { useState } from 'react';
import { PropertyInput, PropertyContainer, PropertyName } from '../../../components/descriptions';
import styled from 'styled-components';
import { DatasetMetadata } from '../../../model/datasets';
import { DatasetRepository } from '../../../api';
import { useNavigate } from 'react-router-dom';

interface MetadataTabProps {
    metadata: DatasetMetadata | null;
}

const ErrorText = styled.p`
    color: red;
`

const SmallErrorText = styled.p`
    color: red;
    font-size: 7px;
`

const ErrorContainer = styled.div`
    margin: 15px 0;
`

const FixContainer = styled.div`
    margin: 20px 0;
    padding-top: 15px;
    border-top: 1px solid gray;
    display: grid;
    gap: 10px;

`

const SubmitButton = styled.button`
    border: 1px solid black;
    border-radius: 10px;
    width: 100px;
    height: 20px;
    margin-left: auto;
    order: 2;
`

const LoadingErrorVisualizer = (props: any) => {
    const navigate = useNavigate();
    const [link, setLink] = useState<string>("");
    const [validationFail, setValidationFail] = useState<boolean>(false);

    const onChange = (newValue: string) => {
        setLink(newValue);
        setValidationFail(false);
    }
    
    const onSubmit = () => {
        const addDataset = async () => {
            if (link.trim().length === 0) {
                setValidationFail(true);
                return;
            }
    
            await DatasetRepository.uploadDataset(props.id, link);
            navigate('/datasets');
        }

        addDataset()
            .catch(_ => alert("Error during dataset upload. Try again later"));
    }


    return (
        <ErrorContainer>
            {props.error && (
                <PropertyContainer>
                    <PropertyName text={'Error message'}/>
                    <ErrorText>{props.error}</ErrorText>
                </PropertyContainer>
            )}
            <FixContainer>
                <p>You can try to upload dataset once again. Paste URL into the field behind</p>
                <PropertyContainer>
                    <PropertyName text={'Dataset new URL'}/>
                    <PropertyInput value={link} setValue={onChange}/>
                    <div/>
                    <SubmitButton onClick={() => onSubmit()}>Submit</SubmitButton>
                </PropertyContainer>
                {validationFail && <SmallErrorText>Field couldn't be empty</SmallErrorText>}
                
            </FixContainer>
        </ErrorContainer>
    )
}

export const MetadataTab = ({metadata}: MetadataTabProps) => {    

    return (
        <div>
            <PropertyContainer>
                <PropertyName text={'Dataset name'}/>
                <PropertyInput disabled={true} value={metadata?.name}/>
                <PropertyName text={'Version'}/>
                <PropertyInput disabled={true} value={metadata?.version}/>
                <PropertyName text={'Status'}/>
                <PropertyInput disabled={true} value={metadata?.status}/>
            </PropertyContainer>
            {
                metadata && !metadata.isLoaded() && <LoadingErrorVisualizer id={metadata.id} error={metadata.uploadError}/>
            }
        </div>
    )
}