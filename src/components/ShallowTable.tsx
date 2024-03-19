import styled from 'styled-components';

interface ShallowTableProps {
    columnNames: string[];
    data: any[];
    needsStringify: boolean;
}

const Container = styled.div`
    margin: 25px 0;
    background-color: #FDFDFD;
    width: 100%;
    padding: 15px;
    height: calc(100% - 110px);
`;

const Row = styled.div<{division: string}>`
    display: grid;
    grid-template-columns: ${props => props.division};
`;

const Cell = styled.div<{isLeft: boolean}>`
    border-bottom: 1px solid black;
    border-left: ${props => props.isLeft ? 0 : '1px solid black'};
    text-align: center;
`

const HeaderCell = styled(Cell)`
    border-bottom: 2px solid black;

    font-weight: 700;
    font-size: 15px;
    color: #03256C;
`

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



export const ShallowTable = ({columnNames, data, needsStringify}: ShallowTableProps) => {
    const subdivision = '1fr ';
    const division: string = subdivision.repeat(columnNames.length);
    console.log(division)


    return (
        <Container>
            <Row division={division}>
                {columnNames.map((name, i) =>
                    <HeaderCell isLeft={i === 0}>
                        {name}
                    </HeaderCell>
                )}
            </Row>
            {data.map(r => 
                <Row division={division}>
                    {r.map((v: any, i: number) =>
                        <Cell isLeft={i === 0}>
                            {needsStringify ? JSON.stringify(v) : v}
                        </Cell>
                    )}
                </Row>
            )}
        </Container>
    )
}