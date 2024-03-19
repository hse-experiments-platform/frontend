import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProtectedPage from "../../components/pages/ProtectedPage";
import styled from 'styled-components';
import { FaPlus } from "react-icons/fa6";
import { CustomTable, PageTitle } from '../../components';
import Dataset from '../../model/Dataset';
import DatasetRepository from "../../api/datasets/DatasetRepository";
import { AuthContext, AuthContextType, RequestContext, RequestContextType } from "../../contexts";

const ButtonContainer = styled.div`
    display: flex;
    gap: 11px;
    justify-content: center;
    color: white;
`

const StyledPlusIcon = styled(FaPlus)`
    width: 20px;
    height: 20px;
    margin-top: 7px;
`

const StyledButtonCaption = styled.p`
    margin-top: 7px;
    font-family: 'Lato';
    font-size: 17px;
`

const Panel = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0 0 0;
`

const StyledButton = styled.div`
    width: 100px;
    height: 35px;
    background-color: #0245D1;
    border: 1 px solid black;
    border-radius: 25px;
    cursor: pointer;
`

const StyledInput = styled.input`
    width: 300px;
    border: 1px solid black;
    border-radius: 25px;
    font-family: 'Lato';
    font-size: 18px;
    padding-left: 13px;
`

const DatasetsPage = () => {
    const { internalToken } = useContext(AuthContext) as AuthContextType;
    const { setError, setIsLoading } = useContext(RequestContext) as RequestContextType;
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const requestDatasets = async () => {
            setIsLoading(true);
            const datasets = await DatasetRepository.getDatasetsList(internalToken, pageIndex, search);
            setDatasets(datasets);
        }
        
        requestDatasets()
            .catch(_ => setError("Request error"))
            .then(_ => setIsLoading(false));
    }, [search, pageIndex])

    return (
        <ProtectedPage>
            <PageTitle title='Datasets'/>
            <Panel>
                <StyledInput
                    type='text'
                    placeholder='Search...'
                    onChange={e => setSearch(e.target.value.toLowerCase())}
                />
                <StyledButton onClick={() => navigate('/datasets/add')}>
                    <ButtonContainer>
                        <StyledPlusIcon/>
                        <StyledButtonCaption>Add</StyledButtonCaption>
                    </ButtonContainer>
                </StyledButton>
            </Panel>
            <CustomTable
                data={datasets}
                columnNames={['Name', 'Version', 'Status']}
                division='1fr 1fr 1fr'
                onClick={(id: number) => navigate(`/datasets/${id}`)}
            />
        </ProtectedPage>
    );
}

export default DatasetsPage;