import { TableContainer, TableCell, TableRow, TableHeaderCell } from "../../../components";
import ScrollContainer from "../../../components/scroll/ScrollElements";
import { DatasetColumn } from "../../../model/datasets";

interface SchemaTableProps {
    columns: DatasetColumn[];
}

const SchemaTable = ({columns}: SchemaTableProps) => {    
    return (
        <TableContainer>
            <ScrollContainer>
                <TableRow count={2} extra={0}>
                    <TableHeaderCell isLeft={true}>
                         Column name
                    </TableHeaderCell>
                    <TableHeaderCell isLeft={false}>
                         Data type
                    </TableHeaderCell>
                </TableRow>

                {columns.map(column =>
                    <TableRow count={2} extra={0}>
                        <TableCell isLeft={true}>
                            {column.name}
                        </TableCell>
                        <TableCell isLeft={false}>
                            <p>{column.type}</p>
                        </TableCell>
                    </TableRow>
                )}
            </ScrollContainer>
        </TableContainer>
    )
}

export default SchemaTable;