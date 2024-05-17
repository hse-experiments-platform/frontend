import styled from 'styled-components';
import { useState, useCallback } from 'react';
import { DatasetColumn, DatasetMetadata } from '../../../model/datasets';
import { DatasetRepository } from '../../../api';
import { PropertyName } from '../../../components/descriptions';
import useRequest from '../../../hooks/useRequest';
import SchemaTable from './SchemaTable';

const SchemaContainer = styled.div`
    height: 290px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`

interface TabProps {
    metadata: DatasetMetadata | null;
}

export const SchemaTab = ({metadata}: TabProps) => {
    const [columns, setColumns] = useState<DatasetColumn[]>([]);

    const fetchColumns = useCallback(async () => {
        const datasetId: number = parseInt(metadata?.id.toString() ?? '');
        const response = await DatasetRepository.getDatasetSchema(datasetId);
        setColumns(response);
    }, [metadata, setColumns]);
    useRequest(fetchColumns);

    return (
        <div>
            <SchemaContainer>
                <PropertyName text={'Dataset columns table'}/>
                <SchemaTable columns={columns}/>
            </SchemaContainer>
        </div>
    )
}