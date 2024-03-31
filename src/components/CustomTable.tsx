import styled from "styled-components";
import TableRow from "./TableRow";

interface CustomTableProps {
    columnNames: string[];
    rows: TableRow[];
    division: string;
    onClick: (id: string) => void;
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
    cursor: pointer;
`;

const DataCell = styled.div`

`;


export const CustomTable = ({columnNames, rows, division, onClick}: CustomTableProps) => {
    
    return (
        <Container>
            <HeaderDataRow division={division}>
                {columnNames.map(column => (
                        <div>{column}</div>
                ))}
            </HeaderDataRow>

            {rows.map(row => (
                <DataRow division={division} key={row.id}>
                    {row.values.map((value, index) => (
                        <DataCell onClick={() => onClick(row.id)} key={index}>{value}</DataCell>
                    ))}
                </DataRow>
            ))}
        </Container>
    )
}