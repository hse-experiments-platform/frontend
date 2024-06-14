import styled from 'styled-components'
import { useLocation } from "react-router-dom"
import { PageTitle, HeaderContainer } from "../../components"
import { ProtectedPage } from "../../components/pages";
import FileDownloader from '../../components/FileDownloader'

const StyledImage = styled.img`
    width: 450px;
    height: 300px;
`

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
`

export const ImageConvertResultPage = () => {
    const location = useLocation();
    const initialImageUrl = location.state.initialImageUrl;
    const resultImageUrl = location.state.resultImageUrl;
    const csvResult = location.state.csvUrl;
    
    return (
        <ProtectedPage>
            <HeaderContainer>
                <PageTitle title="Convertation result"/>
                <FileDownloader filename='GraphicPoints.csv' url={csvResult}/>
            </HeaderContainer>

            <Container>
                <StyledImage src={initialImageUrl}/>
                <StyledImage src={resultImageUrl}/>
            </Container>
        </ProtectedPage>
    )
}