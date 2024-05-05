import styled from 'styled-components'
import { useLocation } from "react-router-dom"
import { PageTitle } from "../../components"
import { ProtectedPage } from "../../components/pages";
import FileDownloader from '../../components/FileDownloader'

const StyledImage = styled.img`
    width: 500px;
    height: 300px;
`

const Container = styled.div`
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
`

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
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