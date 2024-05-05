import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedPage } from "../../components/pages";
import styled from 'styled-components';
import { FaPlus } from "react-icons/fa6";
import { CustomTable, PageTitle } from '../../components';
import useRequest from "../../hooks/useRequest";
import { PageControl } from "../../components/PageControl";
import TableRow from "../TableRow";
import { StyledButton } from "../StyledButton";

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

const ColoredStyledButton = styled(StyledButton)`
    background-color: #0245D1;
`

const StyledInput = styled.input`
    width: 300px;
    height: 25px;
    border: 1px solid black;
    border-radius: 25px;
    font-family: 'Lato';
    font-size: 18px;
    padding-left: 13px;
`

interface EnumerationPageProps {
    pageTitle: string;
    columnNames: string[];
    requestPagesAmount: (query: string) => Promise<number>;
    requestData: (pageNumber: number, query: string) => Promise<any[]>;
    dataTransformer: (item: any) => TableRow;
    addUrl?: string;
    getItemUrl: (itemId: string) => string;
    division?: string;
}

const EnumerationPage = ({pageTitle, columnNames, requestPagesAmount, requestData,
    dataTransformer, addUrl, getItemUrl, division
}: EnumerationPageProps) => {
    const [maxPageNumber, setMaxPageNumber] = useState<number>(1);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [rows, setRows] = useState<TableRow[]>([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState<string>('');
    const [intermediateSearch, setIntermediateSearch] = useState<string>('');
    const [timer, setTimer] = useState<any>(null);

    const fetchMaxPage = useCallback(async () => {
        const pageTotalCount = await requestPagesAmount(search);
        setMaxPageNumber(pageTotalCount);
    }, [setMaxPageNumber, search]);
    useRequest(fetchMaxPage);

    const fetchDatasets = useCallback(async () => {
        const data = await requestData(pageIndex - 1, search);
        const dataRows = data.map(item => dataTransformer(item));
        setRows(dataRows);
    }, [pageIndex, setRows, search, setPageIndex, dataTransformer]);
    useRequest(fetchDatasets);

    const onSearch = (input: string) => {
        setIntermediateSearch(input);

        if (timer) {
            clearTimeout(timer);
        }

        setTimer(
            setTimeout(() => {
                setSearch(input);
                setPageIndex(1);
            }, 500)
        )
    }

    return (
        <ProtectedPage>
            <PageTitle title={pageTitle}/>
            <Panel>
                <StyledInput
                    type='text'
                    placeholder='Search...'
                    value={intermediateSearch}
                    onChange={e => onSearch(e.target.value)}
                />
                {addUrl && <ColoredStyledButton onClick={() => navigate(addUrl)}>
                    <ButtonContainer>
                        <StyledPlusIcon/>
                        <StyledButtonCaption>Add</StyledButtonCaption>
                    </ButtonContainer>
                </ColoredStyledButton>}
            </Panel>
            <CustomTable
                rows={rows}
                columnNames={columnNames}
                division={division ?? '1fr '.repeat(columnNames.length)}
                onClick={(id: string) => navigate(getItemUrl(id))}
            />
            <PageControl
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                maxPageIndex={maxPageNumber}
            />
        </ProtectedPage>
    );
}

export default EnumerationPage;