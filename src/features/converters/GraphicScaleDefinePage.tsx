import styled from 'styled-components';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProtectedPage } from "../../components/pages";
import { LabeledInput, PropertyContainer } from '../../components/descriptions';
import { PageTitle } from '../../components';
import Scale from '../../model/scale/Scale';
import ConvertersRepository from '../../api/converters/ConvertersRepository';
import { useContext } from 'react';
import { RequestContext, RequestContextType } from '../../contexts';

const StyledForm = styled.form`
    display: block;
    height: calc(100% - 60px);
`

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StyledImage = styled.img`
    width: 550px;
    heigth: 450px;
    border: 1px solid black;
    border-radius: 10px;
`

const InputsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: block;
    background-color: white;
    margin-top: 25px;
    border: 1px solid black;
    border-radius: 10px;
    padding: 15px 25px;
`

const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 60px;
    gap: 35px;
`

const StyledLabeledInput = styled.div`
    margin-bottom: 15px;
`

const StyledButton = styled.button`
    width: 70px;
    height: 30px;
    border: 1px solid black;
    border-radius: 15px;
    background-color: #0245D1;
    color: white;
`

interface ScaleParams {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}

const newScaleSchema: yup.ObjectSchema<ScaleParams> = yup.object().shape({
    minX: yup.number().min(0, 'Value couldn`t be less than 0').required('Required'),
    maxX: yup.number().min(0, 'Value couldn`t be less than 0').required('Required'),
    minY: yup.number().min(0, 'Value couldn`t be less than 0').required('Required'),
    maxY: yup.number().min(0, 'Value couldn`t be less than 0').required('Required')
});

export const GraphicScaleDefinePage = () => {
    const { setIsLoading } = useContext(RequestContext) as RequestContextType;
    const navigate = useNavigate();
    const location = useLocation();
    const imageUrl: string = location.state.imageUrl;

    const { register,
        handleSubmit,
        formState: {
            errors
        },
    } = useForm<ScaleParams>({
        resolver: yupResolver(newScaleSchema)
    });

    const submit: SubmitHandler<ScaleParams> = async (data) => {
        setIsLoading(true);
        const result = await ConvertersRepository.runGraphicConversion(imageUrl,
            new Scale(data.minX, data.minY, data.maxX, data.maxY));
        setIsLoading(false);
        navigate('/converters/graphic/result', {
            state: {
                initialImageUrl: imageUrl,
                resultImageUrl: result.graphicUrl,
                csvUrl: result.csvUrl,
            }
        })
    };

    return (
        <ProtectedPage>
            <StyledForm onSubmit={handleSubmit(submit)}>
                <HeaderContainer>
                    <PageTitle title='Graphic converter'/>
                    <StyledButton type='submit'>Run</StyledButton>
                </HeaderContainer>
                
                <InputsContainer>
                    <ContentContainer>
                        <StyledImage src={imageUrl}/>
                   
                        <div>
                            <StyledLabeledInput>
                                <LabeledInput
                                    label='Min X'
                                    register={register('minX')}
                                    error={errors?.minX?.message}
                                />
                            </StyledLabeledInput>

                            <StyledLabeledInput>
                                <LabeledInput
                                    label='Min Y'
                                    register={register('minY')}
                                    error={errors?.minY?.message}
                                />
                            </StyledLabeledInput>

                            <StyledLabeledInput>
                                <LabeledInput
                                    label='Max X'
                                    register={register('maxX')}
                                    error={errors?.maxX?.message}
                                />
                            </StyledLabeledInput>

                            <StyledLabeledInput>
                                <LabeledInput
                                    label='Max Y'
                                    register={register('maxY')}
                                    error={errors?.maxY?.message}
                                />
                            </StyledLabeledInput>
                        </div>
                    </ContentContainer>
                </InputsContainer>
            </StyledForm>
        </ProtectedPage>
    )
}