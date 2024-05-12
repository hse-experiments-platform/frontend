import { useMemo, useCallback } from "react";
import styled from "styled-components";
import { SlOptions } from "react-icons/sl";
import TableRow from "./TableRow";
import { DropdownMenuOption, DropdownMenu } from "./DropdownMenu";

interface EnumerationTableProps {
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


export const EnumerationTable = ({columnNames, rows, division, onClick, options=[]}: EnumerationTableProps) => {
    const processedDivision: string = useMemo(() => `${division} 25px`, [division]);
    const optionIcon = useMemo(() => (<StyledOptionsIcon />), [])
    const getDropdown = useCallback((itemId: string) =>
        <DropdownMenu trigger={optionIcon} options={options} itemId={itemId}/>, [options]);

    return (
        <Container>
            <HeaderDataRow division={processedDivision}>
                {columnNames.map(column => (
                        <div>{column}</div>
                ))}
            </HeaderDataRow>

            {rows.map(row => (
                <DataRow division={processedDivision} key={row.id}>
                    {row.values.map((value, index) => (
                        <DataCell onClick={() => onClick(row.id)} key={index}>{value}</DataCell>
                    ))}
                    {options.length > 0 && getDropdown(row.id)}
                </DataRow>
            ))}
        </Container>
    )
}