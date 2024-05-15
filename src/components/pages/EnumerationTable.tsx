import { MutableRefObject, useMemo, useCallback } from "react";
import styled from "styled-components";
import { SlOptions } from "react-icons/sl";
import TableRow from "../TableRow";
import { DropdownMenuOption, DropdownMenu } from "../DropdownMenu";

interface EnumerationTableProps {
    tableRef: any;
    columnNames: string[];
    rows: TableRow[];
    division: string;
    onClick: (id: string) => void;
    options?: DropdownMenuOption[];
}

const Container = styled.div`
    margin: 25px 0 0 0;
    border: 1px solid #676767;
    border-radius: 10px;
    background-color: #FDFDFD;
    width: 100%;
    padding: 15px;
    height: calc(100% - 130px);
    min-height: 110px;
`;

const HeaderDataRow = styled.div<{division: string}>`
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: ${props => props.division};
    margin-bottom: 20px;

    font-weight: 700;
    font-size: 20px;
    color: #03256C;
`;

const DataRow = styled.div<{division: string}>`
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: ${props => props.division};
    border-bottom: 1px solid #03256C;
    border-radius: 5px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    font-family: 'Lato';
`;

const DataCell = styled.div`
    cursor: pointer;
`;

const StyledOptionsIcon = styled(SlOptions)`
    color: #03256C;
    width: 20px;
    height: 20px;
`

const EmptyStateConatiner = styled.div`
    height: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const EmptyStateText = styled.p`
    font-size: 23px;
    text-align: center;
`


export const EnumerationTable = ({tableRef, columnNames, rows, division, onClick, options=[]}: EnumerationTableProps) => {
    const processedDivision: string = useMemo(() => `${division} 25px`, [division]);
    const optionIcon = useMemo(() => (<StyledOptionsIcon />), [])
    const getDropdown = useCallback((row: TableRow) =>
        <DropdownMenu trigger={optionIcon} options={options} item={{
            id: row.id,
            name: row.values[0]
        }}/>, [options]);

    return (
        <Container ref={tableRef}>
            <HeaderDataRow division={processedDivision}>
                {columnNames.map(column => (
                        <div>{column}</div>
                ))}
            </HeaderDataRow>
            
            {rows.length == 0 && (
                <EmptyStateConatiner>
                    <EmptyStateText>
                        No content is loaded at that time.<br/>
                        Try to add something by pressing "Add".
                    </EmptyStateText>
                </EmptyStateConatiner>
            )}
            {rows.map(row => (
                <DataRow division={processedDivision} key={row.id}>
                    {row.values.map((value, index) => (
                        <DataCell onClick={() => onClick(row.id)} key={index}>{value}</DataCell>
                    ))}
                    {options.length > 0 && getDropdown(row)}
                </DataRow>
            ))}
        </Container>
    )
}