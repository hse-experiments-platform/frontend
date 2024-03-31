import styled from 'styled-components';
import ScrollContainer from './scroll/ScrollElements';

interface ShallowTableProps {
    columnNames: string[];
    data: any[];
}

export const TableContainer = styled.div`
    background-color: #FDFDFD;
    width: 100%;
    height: 100%;
`;

export const TableRow = styled.div<{count: number, extra: number}>`
    display: grid;
    grid-template-columns: ${props => `repeat(${props.count - props.extra}, minmax(90px, 1fr)) ${props.extra === 1 ? '50px' : ''}`};
`;

export const TableCell = styled.div<{isLeft: boolean}>`
    border-bottom: 1px solid black;
    border-left: ${props => props.isLeft ? 0 : '1px solid black'};
    text-align: center;
    padding: 5px;
`

export const TableHeaderCell = styled(TableCell)`
    border-bottom: 2px solid black;

    font-weight: 700;
    font-size: 15px;
    color: #03256C;
`

const Value = styled.p`
    overflow: hidden;
    text-overflow: ellipsis;
`

export const ShallowTable = ({columnNames, data }: ShallowTableProps) => {

    return (
        <TableContainer>
            <ScrollContainer>
                <TableRow count={columnNames.length} extra={0}>
                    {columnNames.map((name, i) =>
                        <TableHeaderCell isLeft={i === 0}>
                            <Value>{name}</Value>
                        </TableHeaderCell>
                    )}
                </TableRow>
                {data.map(r => 
                    <TableRow count={columnNames.length} extra={0}>
                        {r.map((v: any, i: number) =>
                            <TableCell isLeft={i === 0}>
                               <Value>{v}</Value>
                            </TableCell>
                        )}
                    </TableRow>
                )}
           </ScrollContainer>
        </TableContainer>
    )
}