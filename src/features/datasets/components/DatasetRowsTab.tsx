import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { ShallowTable, PageControl } from "../../../components";
import DatasetRow from '../../../model/datasets/DatasetRow';
import DatasetColumn from '../../../model/datasets/DatasetColumn';
import { DatasetRepository } from '../../../api';
import useRequest from '../../../hooks/useRequest';

const TableContainer = styled.div`
    height: 320px;
    width: 850px;
    margin: 0 auto;
`

export const DatasetRowsTab = () => {
    const { id } = useParams();
    const [rows, setRows] = useState<DatasetRow[]>([]);
    const [columns, setColumns] = useState<DatasetColumn[]>([]);
    const [maxPageNumber, setMaxPageNumber] = useState<number>(1);
    const [pageIndex, setPageIndex] = useState<number>(1);

    const fetchMaxPage = useCallback(async () => {
        const datasetId: number = parseInt(id ?? '');
        const pageTotalCount = await DatasetRepository.getRowsPagesCount(datasetId);
        setMaxPageNumber(pageTotalCount);
    }, [setMaxPageNumber, id]);
    useRequest(fetchMaxPage, false);

    const fetchRows = useCallback(async () => {
        const datasetId: number = parseInt(id ?? '');
        const response = await DatasetRepository.getDatasetRows(datasetId, pageIndex - 1);
        setRows(response);
    }, [id, setRows, pageIndex]);
    useRequest(fetchRows, false);

    const fetchColumns = useCallback(async () => {
        const datasetId: number = parseInt(id ?? '');
        const response = await DatasetRepository.getDatasetSchema(datasetId);
        setColumns(response);
    }, [id, setColumns]);
    useRequest(fetchColumns, false);

    const columnNames = columns.map(c => c.name);
    const data = rows.map(r => r.columns)
    
    return (
        <div>
            <TableContainer>
                <ShallowTable columnNames={columnNames} data={data}/>
            </TableContainer>
            <PageControl pageIndex={pageIndex} setPageIndex={setPageIndex} maxPageIndex={maxPageNumber}/>
        </div>
    )
}