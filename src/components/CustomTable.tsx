import styled from "styled-components";

interface CustomTableProps {
    columnNames: string[];
    data: any;
    division: string;
    onClick: (id: number) => void;
}

const Container = styled.div`
    margin: 25px 0;
    border: 1px solid #676767;
    border-radius: 10px;
    background-color: #FDFDFD;
    width: 100%;
    padding: 15px;
    height: calc(100% - 110px);
`;

const HeaderDataRow = styled.div<{division: string}>`
    display: grid;
    grid-template-columns: ${props => props.division};
    margin-bottom: 20px;

    font-weight: 700;
    font-size: 20px;
    color: #03256C;
`;

const DataRow = styled.div<{division: string}>`
    display: grid;
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

const PageControlContainer = styled.div`
    width: 100px;
    height: 25px;
    position: relative;
    right: 10px;
    background-color: black;
`


export const CustomTable = ({columnNames, data, division, onClick}: CustomTableProps) => {
    
    return (
        <Container>
            <HeaderDataRow division={division}>
                {columnNames.map(column => (
                        <div>{column}</div>
                ))}
            </HeaderDataRow>

            {data.map((item: any) => (
                <DataRow division={division}>
                    {columnNames.map(column => (
                        <DataCell onClick={() => onClick(item.id)}>{item[column.toLowerCase()]}</DataCell>
                    ))}
                </DataRow>
            ))}
            
            <PageControlContainer/>
        </Container>
    )
}