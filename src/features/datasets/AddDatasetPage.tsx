import { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ProtectedPage } from "../../components/pages";
import { RequestContext, RequestContextType } from "../../contexts";
import { DatasetRepository } from "../../api";
import { LabeledInput } from "../../components/descriptions";

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

const StyledForm = styled.form`
    display: block;
`

const InputBlock = styled.div`
    @media (min-width: 700px) {
        margin: 35px;
    }
    margin: 20px;
    
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    align-items: center;
    justify-content: center;

    & > p {
        font-size: 20px;
        color: #03256C;
    }

    .styled-input {
        width: 280px;
        height: 30px;
        padding-left: 15px;
    }
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

interface AddDatasetParams {
    name: string;
    link: string;
}

const newDatasetParamsSchema: yup.ObjectSchema<AddDatasetParams> = yup.object().shape({
    name: yup.string().min(1, 'Name couldn`t be empty!').max(20, 'Name couldn`t be bigger than 20 signs!').required('Required'),
    link: yup.string().min(1, 'Link couldn`t be empty!').url('Link must be valid!').required('Required'),
});

export const AddDatasetPage = () => {
    const { setIsLoading } = useContext(RequestContext) as RequestContextType;
    const navigate = useNavigate();
    const { register,
        handleSubmit,
        formState: {
            errors
        },
    } = useForm<AddDatasetParams>({
        defaultValues: {
            name: '',
            link: ''
        },
        resolver: yupResolver(newDatasetParamsSchema)
    });

    

    const onConfirm = (datasetParams: AddDatasetParams) => {
        const addDataset = async () => {
            setIsLoading(true);
            const datasetId = await DatasetRepository.addDataset(datasetParams.name);
            await DatasetRepository.uploadDataset(datasetId, datasetParams.link);
            navigate('/datasets');
        }

        addDataset()
            .catch(_ => alert("Request error. Try again later"))
            .then(_ => setIsLoading(false));
    }

    return (
        <ProtectedPage>
            <StyledTitle>Upload dataset</StyledTitle> 
            <UploadContainer>
                <StyledForm onSubmit={handleSubmit(onConfirm, error => console.log(error))}>
                <InputBlock>
                        <LabeledInput
                            label="Dataset name"
                            placeholder="Enter name..."
                            register={register("name")}
                            error={errors.name?.message}
                        />
                        <LabeledInput
                            label="CSV link"
                            placeholder="Paste URL..."
                            register={register("link")}
                            error={errors.link?.message}
                        />
                    </InputBlock>
                    <ActionsContainer>
                        <CancelButton onClick={() => navigate('/datasets')}>Cancel</CancelButton>
                        <ConfirmButton type='submit'>Confirm</ConfirmButton>
                    </ActionsContainer>
                    </StyledForm>
            </UploadContainer>
        </ProtectedPage>
    )
}