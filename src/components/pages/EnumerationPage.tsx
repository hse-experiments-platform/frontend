import { useState, useCallback, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedPage } from "../../components/pages";
import styled from 'styled-components';
import { FaPlus } from "react-icons/fa6";
import { EnumerationTable, PageTitle } from '../../components';
import useRequest from "../../hooks/useRequest";
import { PageControl } from "../../components/PageControl";
import TableRow from "../TableRow";
import { StyledButton } from "../StyledButton";
import { DropdownMenuOption } from "../DropdownMenu";
import Paginated from "../../model/PaginatedModel";

const StyledPlusIcon = styled(FaPlus)`
    width: 20px;
    height: 20px;
`

const Panel = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0 0 0;
`

const StyledInput = styled.input`
    width: 300px;
    height: 35px;
    border: 1px solid black;
    border-radius: 25px;
    font-family: 'Lato';
    font-size: 18px;
    padding-left: 13px;
`

interface EnumerationPageProps<T> {
    pageTitle: string;
    columnNames: string[];
    requestData: (pageNumber: number, query: string, limit: number) => Promise<Paginated<T>>;
    dataTransformer: (item: T) => TableRow;
    addUrl?: string;
    getItemUrl: (itemId: string, data?: any[]) => string;
    division?: string;
    options?: DropdownMenuOption[];
}

const EnumerationPage = <T,>({pageTitle, columnNames, requestData,
    dataTransformer, addUrl, getItemUrl, division, options
}: EnumerationPageProps<T>) => {
    const navigate = useNavigate();
    const [maxPageNumber, setMaxPageNumber] = useState<number>(1);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [rows, setRows] = useState<TableRow[]>([]);
    const [search, setSearch] = useState<string>('');
    const [intermediateSearch, setIntermediateSearch] = useState<string>('');
    const [timer, setTimer] = useState<any>(null);
    const [tableHeight, setTableHeight] = useState<number>(500);
    const [flag, setFlag] = useState<boolean>(false);
    const tableRef = useRef<any>(null);

    useLayoutEffect(() => {
        setTableHeight(tableRef?.current?.offsetHeight);
        setFlag(true);
    }, []);

    const fetchData = useCallback(async () => {    
        if (!flag)
            return;

        const tableHeightWithoutHeader = tableHeight - 55;
        const tilesNumber = Math.floor(tableHeightWithoutHeader / 55);

        console.log('fetchData', pageIndex, search, tilesNumber)
        const data = await requestData(pageIndex - 1, search, tilesNumber);
        const totalPages = Math.floor(data.total / tilesNumber);        
        const dataRows = data.list.map((item: any) => dataTransformer(item));

        setRows(dataRows);
        setMaxPageNumber(data.total % tilesNumber === 0 ? totalPages : totalPages + 1);
    }, [pageIndex, setRows, search, dataTransformer, requestData, setMaxPageNumber, tableHeight, flag]);
    useRequest(fetchData);

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
                {addUrl && <StyledButton isPrimary={false} onClick={() => navigate(addUrl)}>
                    <StyledPlusIcon/>
                    <p>Add</p>
                </StyledButton>
                }
            </Panel>
            <EnumerationTable
                tableRef={tableRef}
                rows={rows}
                columnNames={columnNames}
                division={division ?? '1fr '.repeat(columnNames.length)}
                onClick={(id: string) => navigate(getItemUrl(id))}
                options={options}
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